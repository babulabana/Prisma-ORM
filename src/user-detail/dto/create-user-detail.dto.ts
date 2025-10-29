import { IsOptional, IsString, IsInt } from 'class-validator';

export class CreateUserDetailDto {
  @IsString()
  @IsOptional()
  phone_no?: string;

  @IsInt()
  @IsOptional()
  age?: number;
}
