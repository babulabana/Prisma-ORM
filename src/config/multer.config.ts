import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { cwd } from 'process';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      // ✅ Save files to src/public/uploads/student
      const uploadPath = join(cwd(), 'public', 'uploads', 'student');

      // Ensure folder exists
      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },

    filename: (req, file, cb) => {
      const timestamp = Date.now();
      const random = Math.round(Math.random() * 1e9);
      const ext = extname(file.originalname);
      const baseName = file.originalname
        .replace(ext, '')
        .replace(/\s+/g, '_')
        .replace(/[^a-zA-Z0-9_-]/g, '');

      cb(null, `${baseName}_${timestamp}_${random}${ext}`);
    },
  }),

  // ✅ Allow any file type
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    cb(null, true);
  },

  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
};
