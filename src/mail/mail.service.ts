import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { readFile } from 'fs/promises';
import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
  ) {}

  async sendOtp(email: string, code: string) {
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
    const welcomeMsg = `${this.i18n.t('translate.otp.welcomeMsg')}`;
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

    return; // Success OTP;
  }
}
