
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstagramDto } from './dto/create-instagram.dto';
import { UpdateInstagramDto } from './dto/update-instagram.dto';
import { CreateInstagramPostDto } from '../instagram-post/dto/create-instagram-post.dto';

@Injectable()
export class InstagramService {
  constructor(private prisma: PrismaService) {}

  // ✅ CREATE Instagram account (requires valid user_id)
  async create(createInstagramDto: CreateInstagramDto) {
    const { user_name, followers, user_id } = createInstagramDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    return this.prisma.instagram.create({
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

  // ✅ FIND ALL Instagram accounts (with their posts and user)
  async findAll() {
    return this.prisma.instagram.findMany({
      include: {
        user: true,
        posts: true, // 👈 includes all related posts
      },
    });
  }

  // ✅ FIND ONE Instagram account by ID (with posts)
  async findOne(id: number) {
    const instagram = await this.prisma.instagram.findUnique({
      where: { id },
      include: {
        user: true,
        posts: true,
      },
    });

    if (!instagram) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    return instagram;
  }

  // ✅ UPDATE Instagram account
  async update(id: number, updateInstagramDto: UpdateInstagramDto) {
    const { user_name, followers, user_id } = updateInstagramDto;

    const existingInstagram = await this.prisma.instagram.findUnique({
      where: { id },
    });
    if (!existingInstagram) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    const data: any = {
      user_name,
      followers,
    };

    if (user_id) {
      const userExists = await this.prisma.user.findUnique({
        where: { id: user_id },
      });
      if (!userExists) {
        throw new NotFoundException(`User with ID ${user_id} not found`);
      }

      data.user = {
        connect: { id: user_id },
      };
    }

    return this.prisma.instagram.update({
      where: { id },
      data,
      include: {
        user: true,
        posts: true,
      },
    });
  }

  // ✅ DELETE Instagram account
  async remove(id: number) {
    const existing = await this.prisma.instagram.findUnique({ where: { id } });

    if (!existing) {
      throw new NotFoundException(`Instagram account with ID ${id} not found`);
    }

    return this.prisma.instagram.delete({
      where: { id },
    });
  }

  // ✅ CREATE a POST for a specific Instagram
  async addPost(
    instagramId: number,
    createInstagramPostDto: CreateInstagramPostDto,
  ) {
    const instagram = await this.prisma.instagram.findUnique({
      where: { id: instagramId },
    });

    if (!instagram) {
      throw new BadRequestException(
        `Instagram with ID ${instagramId} not found`,
      );
    }

    return this.prisma.instagramPost.create({
      data: {
        caption: createInstagramPostDto.caption,
        instagram: {
          connect: { id: instagramId },
        },
      },
      include: { instagram: true },
    });
  }

  // ✅ GET all posts for a given Instagram account
  async getPosts(instagramId: number) {
    const instagram = await this.prisma.instagram.findUnique({
      where: { id: instagramId },
      include: { posts: true },
    });

    if (!instagram) {
      throw new NotFoundException(`Instagram with ID ${instagramId} not found`);
    }

    return instagram.posts;
  }
}
