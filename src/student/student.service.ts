import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.StudentCreateInput) {
    return this.prisma.student.create({ data });
  }

  async findAll() {
    return this.prisma.student.findMany();
  }

  async findOne(id: number) {
    return this.prisma.student.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.StudentUpdateInput) {
    return this.prisma.student.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.student.delete({ where: { id } });
  }
}
