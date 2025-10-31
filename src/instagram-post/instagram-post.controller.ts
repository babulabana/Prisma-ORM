import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InstagramPostService } from './instagram-post.service';
import { CreateInstagramPostDto } from './dto/create-instagram-post.dto';
import { UpdateInstagramPostDto } from './dto/update-instagram-post.dto';

@Controller('instagram-post')
export class InstagramPostController {
  constructor(private readonly instagramPostService: InstagramPostService) {}

  @Post()
  create(@Body() createInstagramPostDto: CreateInstagramPostDto) {
    return this.instagramPostService.create(createInstagramPostDto);
  }

  @Get()
  findAll() {
    return this.instagramPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instagramPostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstagramPostDto: UpdateInstagramPostDto,
  ) {
    return this.instagramPostService.update(+id, updateInstagramPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instagramPostService.remove(+id);
  }
}
