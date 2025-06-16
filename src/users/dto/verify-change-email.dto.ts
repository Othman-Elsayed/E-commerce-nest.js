import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifyChangeEmailDto {
  @IsString()
  @IsNotEmpty()
  otpId: string;

  @IsEmail()
  @IsNotEmpty()
  otpCode: string;
}
