import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { Otp } from '../mail/schemas/otp.schema';

@Injectable()
export class OtpService {
  constructor(@InjectModel(Otp.name) private otpModel: Model<Otp>) {}

  async sendOtp(email: string) {
    const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    await this.otpModel.create({ email, code, expiresAt });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'your@gmail.com',
        pass: 'your-app-password',
      },
    });

    await transporter.sendMail({
      from: 'your@gmail.com',
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP is ${code}`,
    });

    return { message: 'OTP sent' };
  }

  async verifyOtp(email: string, code: string) {
    const record = await this.otpModel.findOne({ email, code });

    if (!record) throw new BadRequestException('Invalid OTP');
    if (record.expiresAt < new Date())
      throw new BadRequestException('OTP expired');

    await this.otpModel.deleteMany({ email }); // Cleanup

    return { message: 'Email verified successfully' };
  }
}
