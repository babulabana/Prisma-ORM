import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstagramPostDto {
  @IsOptional()
  @IsString({ message: 'Caption must be a string' })
  caption?: string;

  @IsNotEmpty({ message: 'Instagram ID is required' })
  @IsInt({ message: 'Instagram ID must be an integer' })
  instagram_id: number;
}
