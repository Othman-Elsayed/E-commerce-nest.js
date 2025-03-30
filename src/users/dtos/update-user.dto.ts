import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  bio: string;

  @IsOptional()
  @IsArray()
  imgs: string;

  @IsOptional()
  @IsString()
  username: string;
}
