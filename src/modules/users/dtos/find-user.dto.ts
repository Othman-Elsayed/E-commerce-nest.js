import { IsOptional } from 'class-validator';

export class FindUserDto {
  // optional fields
  @IsOptional()
  _id?: string;
  @IsOptional()
  email?: string;
  @IsOptional()
  phoneNumber?: string;
}
