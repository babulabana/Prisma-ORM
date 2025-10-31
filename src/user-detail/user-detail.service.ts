
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDetailDto } from './dto/create-user-detail.dto';
import { UpdateUserDetailDto } from './dto/update-user-detail.dto';

@Injectable()
export class UsersDetailsService {
  constructor(private readonly prisma: PrismaService) {}

  // 🟢 Create new user_detail
  async create(data: CreateUserDetailDto) {
    return this.prisma.userDetail.create({
      data: {
        phone_no: data.phone_no,
        age: data.age,
      },
    });
  }

  // 🟡 Get all user_details
  async findAll() {
    return this.prisma.userDetail.findMany({
      include: { user: true }, // shows linked user if exists
    });
  }

  // 🔵 Get one user_detail by ID
  async findOne(id: number) {
    const detail = await this.prisma.userDetail.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!detail) {
      throw new NotFoundException(`User detail with ID ${id} not found`);
    }

    return detail;
  }

  // 🟠 Update user_detail
  async update(id: number, data: UpdateUserDetailDto) {
    const existing = await this.prisma.userDetail.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`User detail with ID ${id} not found`);
    }

    return this.prisma.userDetail.update({
      where: { id },
      data: {
        phone_no: data.phone_no,
        age: data.age,
      },
    });
  }

  // 🔴 Delete user_detail
  async remove(id: number) {
    const existing = await this.prisma.userDetail.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`User detail with ID ${id} not found`);
    }

    return this.prisma.userDetail.delete({
      where: { id },
    });
  }
}
