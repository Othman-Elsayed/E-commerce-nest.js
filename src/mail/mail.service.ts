import { ConfigService } from '@nestjs/config';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './schemas/otp.schema';
import { I18nService } from 'nestjs-i18n';
import { SendOtpDto } from './dto/send-otp.dto';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class MailService {
  constructor(
    @InjectModel(Otp.name) private otpModel: Model<Otp>,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async sendOtp(dto: SendOtpDto) {
    const { email } = dto;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await this.otpModel.create({ email, code, expiresAt });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('SMTP_USERNAME'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });

    // Load and render EJS template
    const templatePath = path.join(__dirname, 'templates', 'otp.ejs');
    const template = await readFile(templatePath, 'utf8');
    const message = this.i18n.t('translate.otp.yourOTPCode');
    const welcomeMsg = `${this.i18n.t('translate.otp.welcomeMsg')} ${dto?.name}`;
    const subWelcomeMsg = this.i18n.t('translate.otp.subWelcomeMsg');

    const html = ejs.render(template, {
      message,
      code,
      welcomeMsg,
      subWelcomeMsg,
    });

    await transporter.sendMail({
      from: this.configService.get<string>('SMTP_USERNAME'),
      to: email,
      subject: message,
      text: `${message} ${code}`,
      html,
    });

    return;
  }

  async verifyOtp(email: string, code: string) {
    const record = await this.otpModel.findOne({ email, code });

    if (!record)
      throw new BadRequestException(this.i18n.t('translate.otp.verify'));
    if (record.expiresAt < new Date())
      throw new BadRequestException(this.i18n.t('translate.otp.expired'));

    await this.otpModel.deleteMany({ email });

    return;
  }
}
