import { IsEmail, IsOptional, IsString, ValidateNested, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateUserDetailDto } from '../../user-detail/dto/create-user-detail.dto';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  name?: string;

  // If user_detail already exists, use its ID
  @IsInt()
  @IsOptional()
  user_detail_id?: number;

  // Or create a new one directly
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserDetailDto)
  user_detail?: CreateUserDetailDto;
}
