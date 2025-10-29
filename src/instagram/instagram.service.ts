import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';

@Injectable()
export class InstagramService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE Instagram account (requires valid user_id)
  async create(createInstagramDto: CreateInstagramDto) {
    const { user_name, followers, user_id } = createInstagramDto;

    // 1️⃣ Check if the user exists before linking
    const existingUser = await this.prisma.users.findUnique({
      where: { id: user_id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    // 2️⃣ Create Instagram linked to existing user
    return this.prisma.instagrams.create({
      data: {
        user_name,
        followers,
        user: {
          connect: { id: user_id },
        },
      },
      include: { user: true },
    });
  }

  // ✅ FIND ALL Instagram accounts
  async findAll() {
    return this.prisma.instagrams.findMany({
      include: { user: true },
    });
  }

  // ✅ FIND ONE Instagram account by ID
  async findOne(id: number) {
    const instagram = await this.prisma.instagrams.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!instagram) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    return instagram;
  }

  // ✅ UPDATE Instagram account (optionally update user_id)
  async update(id: number, updateInstagramDto: UpdateInstagramDto) {
    const { user_name, followers, user_id } = updateInstagramDto;

    // Check if Instagram exists
    const existingInstagram = await this.prisma.instagrams.findUnique({
      where: { id },
    });
    if (!existingInstagram) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    const data: any = {
      user_name,
      followers,
    };

    // 3️⃣ If user_id provided, validate and reconnect
    if (user_id) {
      const userExists = await this.prisma.users.findUnique({
        where: { id: user_id },
      });
      if (!userExists) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      data.user = {
        connect: { id: user_id },
      };
    }

    return this.prisma.instagrams.update({
      where: { id },
      data,
      include: { user: true },
    });
  }

  // ✅ DELETE Instagram account
  async remove(id: number) {
    const existing = await this.prisma.instagrams.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    return this.prisma.instagrams.delete({
      where: { id },
    });
  }
}
