// import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
// import { PrismaService } from '../prisma/prisma.service'; // ✅ import PrismaService

// @Module({
//   controllers: [UserController],
//   providers: [UserService, PrismaService], // ✅ register it here
// })
// export class UserModule {}
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
