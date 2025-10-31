import { Module } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { InstagramController } from '../instagram/instagram.controller'

@Module({
  controllers: [InstagramController],
  providers: [InstagramService],
})
export class InstagramModule {}
