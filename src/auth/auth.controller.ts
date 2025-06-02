import { AuthService } from '@auth/auth.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ResponseMeta } from '@shared/decorators/response.decorator';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { VerifyForgetPassDto } from './dto/verify-forget-pass.dto';
import { RestPassDto } from './dto/rest-pass.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  @ResponseMeta({
    message:
      'Account Created 🎉, Please check your email for the OTP to verify your account.',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ResponseMeta({ message: 'Login successfully 🎉' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('verify-account')
  @ResponseMeta({ message: 'Verified account successfully 🎉' })
  verifyAccount(@Body() dto: VerifyAccountDto) {
    return this.authService.verifyAccount(dto);
  }

  @Post('verify-forget-password')
  @ResponseMeta({ message: 'Verified account successfully 🎉' })
  verifyForgetPass(@Body() dto: VerifyForgetPassDto) {
    return this.authService.verifyForgetPass(dto);
  }

  @Post('forget-password')
  @ResponseMeta({ message: 'Otp forget password has sent successfully 🎉' })
  forgetPass(@Body() dto: ForgetPasswordDto) {
    return this.authService.forgetPassword(dto);
  }

  @Post('rest-password')
  @ResponseMeta({ message: 'Rest password successfully 🎉' })
  restPassword(@Body() dto: RestPassDto) {
    return this.authService.restPassword(dto);
  }
}
