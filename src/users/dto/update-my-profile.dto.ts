import { Cloudinary, GenderUser } from '@shared/constants';
import {
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdateMyProfileDto {
  @IsOptional()
  @MinLength(3)
  @MaxLength(30)
  name?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsObject()
  avatar?: Cloudinary;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsString()
  address?: string;

  @IsEnum(GenderUser)
  @IsOptional()
  gender?: GenderUser;
}
