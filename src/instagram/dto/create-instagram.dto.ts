import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateInstagramDto {
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  user_name: string;

  @IsOptional()
  @IsInt({ message: 'Followers must be an integer' })
  @Min(0, { message: 'Followers count cannot be negative' })
  followers?: number;

  @IsInt({ message: 'User ID must be an integer' })
  @IsNotEmpty({ message: 'User ID is required' })
  user_id: number; // Each Instagram belongs to one User
}
