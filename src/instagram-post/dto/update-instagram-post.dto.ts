import { PartialType } from '@nestjs/mapped-types';
import { CreateInstagramPostDto } from './create-instagram-post.dto';

export class UpdateInstagramPostDto extends PartialType(
  CreateInstagramPostDto,
) {}
