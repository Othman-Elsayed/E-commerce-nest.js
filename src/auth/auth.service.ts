import { UserService } from './../users/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dtos/register.dto';
import { RolesType } from '@utils/constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const findUser: any = await this.userService.findOne({ email: dto.email });
    if (findUser) throw new NotFoundException('this user already exist');

    const newUser: any = await this.userService.create(dto);
    const access_token = await this.generateToken({ _id: newUser._id });

    return { ...newUser._doc, access_token, __v: undefined };
  }

  async login(dto: LoginDto) {
    const findUser: any = await this.userService.findOne(
      { email: dto.email },
      RolesType.ADMIN,
    );
    if (!findUser)
      throw new NotFoundException('password or email incorrect ❌');

    if (dto.password === findUser.password) {
      const access_token = await this.generateToken({ _id: findUser._id });
      return {
        _id: findUser._id,
        email: findUser.email,
        phoneNumber: findUser.phoneNumber,
        isVerified: findUser.isVerified,
        country: findUser.country,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
        access_token,
      };
    }

    throw new BadRequestException('password or email incorrect ❌');
  }

  async generateToken(payload: any) {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
