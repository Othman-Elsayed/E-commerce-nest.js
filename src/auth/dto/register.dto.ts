import {
  Cloudinary,
  GenderUser,
  RolesUser,
  UserFieldLimits,
} from '@shared/constants';
import { CloudinaryDto } from '@shared/dto/cloudinary.dto';
import { IsNonEmptyObject } from '@shared/pipes/is-not-empty-object.pipe';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested,
} from 'class-validator';

export class RegisterDto {
  @MinLength(UserFieldLimits.minName)
  @MaxLength(UserFieldLimits.maxName)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MinLength(UserFieldLimits.minEmail)
  @MaxLength(UserFieldLimits.maxEmail)
  @IsString()
  @IsNotEmpty()
  email: string;

  @MinLength(UserFieldLimits.minPassword)
  @MaxLength(UserFieldLimits.maxPassword)
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(UserFieldLimits.minUsername)
  @MaxLength(UserFieldLimits.maxUsername)
  username?: string;

  @IsOptional()
  @IsEnum(RolesUser)
  roles?: string;

  @IsOptional()
  @IsNonEmptyObject({ message: 'Avatar cannot be empty object' })
  @ValidateNested()
  @Type(() => CloudinaryDto)
  avatar?: Cloudinary;

  @IsOptional()
  @Min(UserFieldLimits.minAge)
  @Max(UserFieldLimits.maxAge)
  age?: number;

  @IsOptional()
  @IsEnum(GenderUser)
  gender?: GenderUser;

  @IsOptional()
  @IsString()
  @MaxLength(UserFieldLimits.maxAddress)
  address?: string;

  @IsOptional()
  @IsString()
  @Length(UserFieldLimits.maxPhone)
  phoneNumber?: string;
}
