
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE user (handles nested user_detail)
  async create(createUserDto: CreateUserDto) {
    const { email, name, user_detail_id, user_detail } = createUserDto;

    const data: any = { email, name };

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

    return this.prisma.user.create({
      data,
      include: {
        user_detail: true,
        instagram: {
          include: {
            posts: true, // 👈 Include posts under each Instagram
          },
        },
      },
    });
  }

  // ✅ FIND ALL Users (pagination + relations)
  async findAll(page = 1, limit = 2) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        include: {
          user_detail: true,
          instagram: {
            include: {
              posts: true,
            },
          },
        },
        orderBy: { id: 'asc' },
      }),
      this.prisma.user.count(),
    ]);

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      data: users,
    };
  }

  // ✅ FIND ONE USER (with user_detail + instagram + posts)
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        user_detail: true,
        instagram: {
          include: {
            posts: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (user.user_detail) (user.user_detail as any).test = 30; // Example additional field

    return user;
  }

  // ✅ UPDATE USER (can also update user_detail)
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, name, user_detail_id, user_detail } = updateUserDto;

    const existing = await this.prisma.user.findUnique({ where: { id } });
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

    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        user_detail: true,
        instagram: {
          include: {
            posts: true,
          },
        },
      },
    });
  }

  // ✅ DELETE USER
  async remove(id: number) {
    const existing = await this.prisma.user.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.prisma.user.delete({
      where: { id },
    });
  }
}
