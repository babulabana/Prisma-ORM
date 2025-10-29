import { Module } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { InstagramController } from './instagram.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService, PrismaService],
})
export class InstagramModule {}
