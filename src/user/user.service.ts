import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE user (handles nested user_detail)
  async create(createUserDto: CreateUserDto) {
    const { email, name, user_detail_id, user_detail } = createUserDto;

    const data: any = {
      email,
      name,
    };

    if (user_detail_id) {
      // Link existing user_detail
      data.user_detail = {
        connect: { id: user_detail_id },
      };
    } else if (user_detail) {
      // Create a new user_detail
      data.user_detail = {
        create: user_detail,
      };
    }

    return this.prisma.users.create({
      data,
      include: {
        user_detail: true,
        instagram: true, // 👈 include Instagram accounts
      },
    });
  }

  // ✅ FIND ALL USERS (with user_detail + instagram accounts)
  async findAll() {
    return this.prisma.users.findMany({
      include: {
        user_detail: true,
        instagram: true, // 👈 include all Instagram accounts
      },
    });
  }

  // ✅ FIND ONE USER (with user_detail + instagram accounts)
  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      include: {
        user_detail: true,
        instagram: true, // 👈 include Instagram data
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  // ✅ UPDATE USER (can also update user_detail)
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, name, user_detail_id, user_detail } = updateUserDto;

    const existing = await this.prisma.users.findUnique({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const data: any = { email, name };

    if (user_detail_id) {
      data.user_detail = {
        connect: { id: user_detail_id },
      };
    } else if (user_detail) {
      data.user_detail = {
        update: user_detail,
      };
    }

    return this.prisma.users.update({
      where: { id },
      data,
      include: {
        user_detail: true,
        instagram: true, // 👈 include Instagram accounts in response
      },
    });
  }

  // ✅ DELETE USER
  async remove(id: number) {
    const existing = await this.prisma.users.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.users.delete({
      where: { id },
    });
  }
}
