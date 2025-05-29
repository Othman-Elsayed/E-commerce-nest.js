import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class SendOtpDto {
  @IsNotEmpty({ message: i18nValidationMessage('translate.required.email') })
  email: string;

  @IsOptional()
  @IsString({
    message: i18nValidationMessage('translate.required.nameIsString'),
  })
  name?: string;
}
