import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ChangeEmailDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  newEmail: string;
}
