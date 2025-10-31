import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { multerConfig } from 'src/config/multer.config'; // ✅ Import config

@Module({
  imports: [
    MulterModule.register(multerConfig), // ✅ Use shared config
  ],
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
})
export class StudentModule {}
