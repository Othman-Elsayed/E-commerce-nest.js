import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { TokenService } from './../shared/token/token.service';
import { UsersRepository } from 'src/users/repository/users.repository';
import { OtpService } from 'src/otp/otp.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { VerifyAccountDto } from './dto/verify-account.dto';
import { RestPassDto } from './dto/rest-pass.dto';
import { VerifyForgetPassDto } from './dto/verify-forget-pass.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => OtpService))
    private readonly otpService: OtpService,
    private readonly tokenService: TokenService,
    private readonly usersRepository: UsersRepository,
  ) {}

  public async register(dto: RegisterDto) {
    const hasPassword = await bcrypt.hash(dto.password, 10);
    await this.usersRepository.create({
      ...dto,
      password: hasPassword,
    });
    const otpRecord = await this.otpService.send({
      email: dto?.email,
      typeSend: 'verifyEmail',
    });
    return {
      otpId: otpRecord.otpId,
    };
  }

  public async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersRepository.findOne({
      filter: { email },
      failedMsg: 'Invalid email or username',
      select: '+phoneNumber +email +password',
    });

    if (!user.isEmailVerified)
      throw new BadRequestException('This account not verified');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    if (user.is2FA) {
      await this.otpService.send({
        email,
        typeSend: '2fa',
      });

      return {
        message: 'Otp has sent successfully',
      };
    }
    console.log('skip 2FA');

    const token = await this.tokenService.generateToken({
      userId: user._id,
      roles: user.roles,
    });

    const { __v, password: pass, ...other } = user.toObject();
    return {
      token,
      user: other,
    };
  }

  public async forgetPassword(dto: ForgetPasswordDto) {
    const { email } = dto;
    await this.usersRepository.findOne({ filter: { email } });
    const otp = await this.otpService.send({
      email,
      typeSend: 'forgetPass',
    });

    return {
      otpId: otp.otpId,
    };
  }

  public async restPassword(dto: RestPassDto) {
    const { confirmPass, email, newPass } = dto;
    const user = await this.usersRepository.findOne({ filter: { email } });
    if (!user.isReqForgetPassVerified)
      throw new BadRequestException(
        'You must verify OTP before resetting password',
      );

    if (confirmPass !== newPass)
      throw new BadRequestException('Confirm password not match new password');

    const hashPass = await bcrypt.hash(newPass, 10);
    await this.usersRepository.edit({
      filter: { _id: user?._id },
      payload: { password: hashPass, isReqForgetPassVerified: false },
    });
  }

  public async verify2FA(dto: VerifyAccountDto) {
    const { otpId, otpCode } = dto;
    const recordOtp = await this.otpService.verify({
      otpCode,
      otpId,
    });

    const user = await this.usersRepository.findOne({
      filter: { _id: recordOtp.userId },
      failedMsg: 'Invalid email or username',
      select: '+phoneNumber +email +password',
    });

    const token = await this.tokenService.generateToken({
      userId: user._id,
      roles: user.roles,
    });

    const { __v, password: pass, ...other } = user.toObject();
    return {
      token,
      user: other,
    };
  }

  public async verifyAccount(dto: VerifyAccountDto) {
    const { otpId, otpCode } = dto;
    const verifyOtp = await this.otpService.verify({ otpId, otpCode });
    const user = await this.usersRepository.edit({
      filter: { _id: verifyOtp?.userId },
      payload: { isEmailVerified: true },
      select: '+email +phoneNumber',
    });
    const token = await this.tokenService.generateToken({
      userId: user._id,
      roles: user.roles,
    });
    const { password, ...other } = user.toObject();
    return {
      token,
      user: other,
    };
  }

  public async verifyForgetPass(dto: VerifyForgetPassDto) {
    const { otpId, otpCode } = dto;
    const verifyOtp = await this.otpService.verify({ otpId, otpCode });
    await this.usersRepository.edit({
      filter: { _id: verifyOtp?.userId },
      payload: { isReqForgetPassVerified: true },
    });
    return;
  }
}
