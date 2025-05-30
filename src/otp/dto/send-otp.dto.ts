import { IsEmail, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SendOtpDto {
  @IsEmail()
  @IsNotEmpty({ message: i18nValidationMessage('translate.required.email') })
  email: string;
}
