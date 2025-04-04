import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
  // optional fields
  @IsOptional()
  @IsString()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}
