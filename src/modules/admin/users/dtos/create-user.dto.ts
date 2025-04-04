import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { UserAvatarDto } from '@shared/dtos/avatar.dto';
import { UserGender, UserRole } from '@shared/types/user';

export class CreateUserDto {
  // required fields
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  age: number;

  @IsNotEmpty()
  @IsString()
  address: string;

  // optional fields
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UserAvatarDto)
  avatar?: UserAvatarDto;

  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}
