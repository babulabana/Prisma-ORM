import { Global, Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Global() // Makes PrismaService available globally (optional)
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
