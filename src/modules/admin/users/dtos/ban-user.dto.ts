import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class BanUserDto {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  _id: string;
}
