// import {
//   Controller,
//   Post,
//   Get,
//   Param,
//   Body,
//   Delete,
//   Put,
//   UploadedFile,
//   UseInterceptors,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { StudentService } from './student.service';

// @Controller('student')
// export class StudentController {
//   constructor(private readonly studentService: StudentService) {}

//   // 📤 Create a new student (with optional file upload)
//   @Post()
//   @UseInterceptors(FileInterceptor('file'))
//   async create(@Body() body, @UploadedFile() file?: Express.Multer.File) {
//     const { name, age, address } = body;

//     const filePath = file ? `/public/uploads/student/${file.filename}` : null;

//     const data = {
//       name,
//       age: Number(age),
//       address,
//       file: filePath,
//     };

//     return this.studentService.create(data);
//   }

//   // 📋 Get all students
//   @Get()
//   findAll() {
//     return this.studentService.findAll();
//   }

//   // 🔍 Get one student by ID
//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.studentService.findOne(+id);
//   }

//   // ✏️ Update student (with optional new file)
//   @Put(':id')
//   @UseInterceptors(FileInterceptor('file'))
//   async update(
//     @Param('id') id: string,
//     @Body() body,
//     @UploadedFile() file?: Express.Multer.File,
//   ) {
//     const data: any = {
//       ...body,
//       age: Number(body.age),
//     };

//     if (file) {
//       data.file = `/public/uploads/${file.filename}`;
//     }

//     return this.studentService.update(+id, data);
//   }

//   // 🗑️ Delete student
//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.studentService.remove(+id);
//   }
// }
import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UploadedFile,
  UseInterceptors,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Request } from 'express';
import { StudentService } from './student.service';
import { diskStorage } from 'multer';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  // ✅ Create new student
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', '..', 'public', 'uploads', 'student');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
          const ext = file.originalname.split('.').pop();
          cb(null, `student_${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  async create(@Req() req: Request, @Body() body, @UploadedFile() file?: Express.Multer.File) {
    try {
      const { name, age, address } = body;

      if (!name || !age || !address) {
        throw new BadRequestException('Missing required fields');
      }

      const filePath = file ? `/public/uploads/student/${file.filename}` : null;

      const data = {
        name,
        age: Number(age),
        address,
        file: filePath,
      };

      const student = await this.studentService.create(data);

      // ✅ Return full URL
      return {
        ...student,
        file: student.file
          ? `${req.protocol}://${req.get('host')}${student.file}`
          : null,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // 📋 Get all students (full file URLs)
  @Get()
  async findAll(@Req() req: Request) {
    const students = await this.studentService.findAll();
    return students.map((s) => ({
      ...s,
      file: s.file ? `${req.protocol}://${req.get('host')}${s.file}` : null,
    }));
  }

  // 🔍 Get one student (full file URL)
  @Get(':id')
  async findOne(@Req() req: Request, @Param('id') id: string) {
    const student = await this.studentService.findOne(+id);
    if (!student) throw new BadRequestException('Student not found');

    return {
      ...student,
      file: student.file
        ? `${req.protocol}://${req.get('host')}${student.file}`
        : null,
    };
  }

  // ✏️ Update student (optional new file)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const uploadPath = join(__dirname, '..', '..', 'public', 'uploads', 'student');
          if (!existsSync(uploadPath)) mkdirSync(uploadPath, { recursive: true });
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
          const ext = file.originalname.split('.').pop();
          cb(null, `student_${uniqueSuffix}.${ext}`);
        },
      }),
    }),
  )
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() body,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const data: any = { ...body, age: Number(body.age) };

    if (file) {
      data.file = `/public/uploads/student/${file.filename}`;
    }

    const updated = await this.studentService.update(+id, data);

    // ✅ Return updated data with full file URL
    return {
      ...updated,
      file: updated.file
        ? `${req.protocol}://${req.get('host')}${updated.file}`
        : null,
    };
  }

  // 🗑️ Delete student
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(+id);
  }
}
