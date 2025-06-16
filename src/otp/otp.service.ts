import { MailService } from './../mail/mail.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from '../otp/schema/otp.schema';
import { I18nService } from 'nestjs-i18n';
import { SendOtpDto } from '../otp/dto/send-otp.dto';
import { VerifyOtp } from '../otp/dto/verify-otp.dto';
import { UsersRepository } from 'src/users/repository/users.repository';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class OtpService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
    private readonly usersRepository: UsersRepository,
    private readonly i18n: I18nService,
  ) {}

  public async send(dto: SendOtpDto) {
    const { email, typeSend } = dto;
    const user = await this.usersRepository.findOne({
      filter: { email },
      failedMsg: 'Please create an account first.',
    });
    const userId = user?._id?.toString();

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(code, 10);
    const expiresInMinutes =
      Date.now() +
      Number(this.configService.get<string>('OTP_EXPIRATION_MINUTES')) *
        60 *
        1000;
    const expiresAt = new Date(expiresInMinutes);

    const lastOtp = await this.otpModel
      .findOne({ userId })
      .sort({ createdAt: -1 });

    // 🔒 منع الإرسال المتكرر خلال 60 ثانية
    if (lastOtp && Date.now() - lastOtp.createdAt.getTime() < 60_000) {
      throw new BadRequestException(
        'Please wait 1 minute before requesting a new OTP',
      );
    }

    await this.otpModel.deleteMany({ userId });

    const otpCreated = await this.otpModel.create({
      userId,
      code: hashedOtp,
      expiresAt,
    });

    const payloadSend = {
      email,
      code,
      username: user?.name,
    };

    if (typeSend === 'forgetPass') {
      this.mailService.forgetPassword(payloadSend);
    } else {
      this.mailService.sendOtp(payloadSend);
    }

    return {
      otpId: otpCreated?._id?.toString(),
    };
  }

  public async verify(dto: VerifyOtp) {
    const { otpCode, otpId } = dto;
    const recordOtp = await this.otpModel.findOne({ _id: otpId });

    if (!recordOtp || recordOtp.expiresAt < new Date())
      throw new BadRequestException(this.i18n.t('translate.otp.invalid'));

    if (recordOtp.attempts >= 3) {
      throw new ForbiddenException('Too many failed attempts');
    }

    const isMatch = await bcrypt.compare(otpCode, recordOtp.code);

    if (!isMatch) {
      await this.otpModel.findOneAndUpdate(
        { _id: otpId },
        { $inc: { attempts: 1 } },
        { new: true },
      );
      throw new BadRequestException('OTP is invalid or expired');
    }

    await this.otpModel.deleteMany({ _id: otpId });

    return recordOtp;
  }
}
