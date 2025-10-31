import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { UsersDetailsModule } from './user-detail/user-detail.module';
import { InstagramModule } from './instagram/instagram.module';
import { InstagramPostModule } from './instagram-post/instagram-post.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    UsersDetailsModule,
    InstagramModule,
    InstagramPostModule,
    StudentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
