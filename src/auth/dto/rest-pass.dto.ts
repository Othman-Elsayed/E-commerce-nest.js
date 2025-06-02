import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RestPassDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  newPass: string;

  @IsString()
  @IsNotEmpty()
  confirmPass: string;
}
