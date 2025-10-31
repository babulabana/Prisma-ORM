import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';
import { UpdateInstagramPostDto } from './dto/update-instagram-post.dto';

@Injectable()
export class InstagramPostService {
  constructor(private readonly prisma: PrismaService) {}

  // ✅ CREATE new post (linked to an Instagram)
  async create(createInstagramPostDto: CreateInstagramPostDto) {
    const { caption, instagram_id } = createInstagramPostDto;

    // 1️⃣ Check if parent Instagram exists
    const instagram = await this.prisma.instagram.findUnique({
      where: { id: instagram_id },
    });

    if (!instagram) {
      throw new BadRequestException(
        `Instagram with ID ${instagram_id} not found`,
      );
    }

    // 2️⃣ Create new InstagramPost
    return this.prisma.instagramPost.create({
      data: {
        caption,
        instagram: { connect: { id: instagram_id } },
      },
      include: { instagram: true },
    });
  }

  // ✅ FIND ALL posts (with related Instagram info)
  async findAll() {
    return this.prisma.instagramPost.findMany({
      include: { instagram: true },
    });
  }

  // ✅ FIND ONE POST
  async findOne(id: number) {
    const post = await this.prisma.instagramPost.findUnique({
      where: { id },
      include: { instagram: true },
    });

    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  // ✅ UPDATE post
  async update(id: number, updateInstagramPostDto: UpdateInstagramPostDto) {
    const existing = await this.prisma.instagramPost.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.prisma.instagramPost.update({
      where: { id },
      data: updateInstagramPostDto,
      include: { instagram: true },
    });
  }

  // ✅ DELETE post
  async remove(id: number) {
    const existing = await this.prisma.instagramPost.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return this.prisma.instagramPost.delete({
      where: { id },
    });
  }
}
