import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SendOtpDto {
  @IsEmail()
  @IsNotEmpty({ message: i18nValidationMessage('translate.required.email') })
  email: string;

  @IsOptional()
  @IsString()
  typeSend?: 'verifyEmail' | 'forgetPass' | '2fa';

  @IsOptional()
  @IsString()
  verificationLink?: string;
}
