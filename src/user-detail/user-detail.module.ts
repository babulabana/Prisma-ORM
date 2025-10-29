import { Module } from '@nestjs/common';
import { UsersDetailsService } from '../user-detail/user-detail.service';
import { UserDetailController } from '../user-detail/user-detail.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [UserDetailController],
  providers: [UsersDetailsService, PrismaService],
})
export class UsersDetailsModule {}
