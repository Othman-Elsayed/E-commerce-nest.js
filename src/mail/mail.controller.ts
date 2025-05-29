import { Body, Controller, Post } from '@nestjs/common';
import { ResponseMeta } from '@shared/decorators/response.decorator';
import { MailService } from './mail.service';
import { SendOtpDto } from './dto/send-otp.dto';

@Controller()
export class MailController {
  constructor(private otpService: MailService) {}

  @Post('/otp/send')
  @ResponseMeta({ message: 'translate.otp.sent' })
  send(@Body() dto: SendOtpDto) {
    return this.otpService.sendOtp(dto);
  }

  @Post('/otp/verify')
  @ResponseMeta({ message: 'translate.otp.verify' })
  verify(@Body() body: { email: string; code: string }) {
    return this.otpService.verifyOtp(body.email, body.code);
  }
}
