import { IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class VerifyOtp {
  @IsNotEmpty()
  otpId: string;

  @IsNotEmpty({ message: i18nValidationMessage('translate.required.code') })
  otpCode: string;
}
