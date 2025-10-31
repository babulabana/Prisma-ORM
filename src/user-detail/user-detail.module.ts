import { Module } from '@nestjs/common';
import { UsersDetailsService } from '../user-detail/user-detail.service';
import { UserDetailController } from '../user-detail/user-detail.controller';

@Module({
  controllers: [UserDetailController],
  providers: [UsersDetailsService],
})
export class UsersDetailsModule {}
