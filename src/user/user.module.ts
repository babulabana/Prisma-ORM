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
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
