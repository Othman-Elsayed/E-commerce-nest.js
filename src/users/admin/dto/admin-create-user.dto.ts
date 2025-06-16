import { Cloudinary, GenderUser, RolesUser } from '@shared/constants';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(RolesUser)
  role: RolesUser;

  @IsOptional()
  @IsObject()
  avatar: Cloudinary;

  @IsOptional()
  @IsNumber()
  age: number;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsString()
  address: string;

  @IsEnum(GenderUser)
  @IsNotEmpty()
  gender: GenderUser;
}
