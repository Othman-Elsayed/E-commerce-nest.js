import { IsNotEmpty, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class VerifyAccountDto {
  @IsNotEmpty()
  @IsString()
  otpId: string;

  @IsNotEmpty({ message: i18nValidationMessage('translate.required.code') })
  @IsString()
  otpCode: string;
}
