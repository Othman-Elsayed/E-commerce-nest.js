import { Body, Controller, Post } from '@nestjs/common';
import { ResponseMeta } from '@shared/decorators/response.decorator';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { VerifyOtp } from '../otp/dto/verify-otp.dto';
import { OtpService } from './otp.service';

@Controller('otp')
export class OtpController {
  constructor(private otpService: OtpService) {}

  @Post('send')
  @ResponseMeta({ message: 'translate.otp.sent' })
  send(@Body() dto: SendOtpDto) {
    return this.otpService.send(dto);
  }

  @Post('verify')
  @ResponseMeta({ message: 'translate.otp.verify' })
  verify(@Body() dto: VerifyOtp) {
    return this.otpService.verify(dto);
  }
}
