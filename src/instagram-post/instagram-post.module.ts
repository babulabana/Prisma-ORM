import { Module } from '@nestjs/common';
import { InstagramPostService } from './instagram-post.service';
import { InstagramPostController } from './instagram-post.controller';

@Module({
  controllers: [InstagramPostController],
  providers: [InstagramPostService],
})
export class InstagramPostModule {}
