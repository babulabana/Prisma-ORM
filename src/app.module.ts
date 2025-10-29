import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UsersDetailsModule } from './user-detail/user-detail.module';
import { InstagramModule } from './instagram/instagram.module';

@Module({
  imports: [PrismaModule, UserModule, UsersDetailsModule, InstagramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
