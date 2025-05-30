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
    });
    return {
      otpId: otpRecord.otpId,
    };
  }

  public async login(dto: LoginDto) {
    const { email, username, password } = dto;

    if (!email && !username) {
      throw new BadRequestException('Please enter your email or username');
    }

    const user = await this.usersRepository.findOne({
      filter: {
        $or: [{ email }, { username }],
      },
      failedMsg: 'Invalid email or username',
      select: '+phoneNumber +email +password',
    });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

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
}
