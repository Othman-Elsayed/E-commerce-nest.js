import { OtpService } from 'src/otp/otp.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { VerifyChangeEmailDto } from './dto/verify-change-email.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly otpService: OtpService,
  ) {}

  public async getMyProfile(currentUserId: string) {
    return await this.userRepository.findOne({
      filter: { _id: currentUserId },
      select: '+email +phoneNumber',
    });
  }

  public async updateProfile(currentUserId: string, dto: UpdateMyProfileDto) {
    return this.userRepository.edit({
      filter: { _id: currentUserId },
      payload: dto,
    });
  }

  public async changeEmail(currentUserId: string, payload: ChangeEmailDto) {
    const { newEmail, password } = payload;

    // [1] Verify password
    const findUser = await this.userRepository.findOne({
      filter: { _id: currentUserId },
      select: '+password',
    });
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) throw new BadRequestException('translate.categories.findAll');

    // [2] Verify new email
    const otp = await this.otpService.send({
      email: newEmail,
      storage: newEmail,
      typeSend: 'verifyEmail',
    });

    return {
      otpId: otp.otpId,
    };
  }

  public async verifyChangeEmail(payload: VerifyChangeEmailDto) {
    const { otpCode, otpId } = payload;
    const verifyOtp = await this.otpService.verify({ otpCode, otpId });
    const updateUser = await this.userRepository.edit({
      filter: { _id: verifyOtp.userId },
      payload: {
        email: verifyOtp.storage,
      },
      select: '+email',
    });
    return {
      user: updateUser,
    };
  }
}
