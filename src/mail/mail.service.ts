import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(
    private readonly i18n: I18nService,
    private readonly mailerService: MailerService,
  ) {}

  public async safeSendMail(mailOptions: any) {
    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (err) {
      console.log('err send email', err);
    }
  }

  public async sendOtp({ name, email, code }: any) {
    const msgs = {
      welcome: this.i18n.t('translate.ejs.welcome'),
      thankYouForRegistering: this.i18n.t(
        'translate.ejs.thankYouForRegistering',
      ),
      yourVerificationCode: this.i18n.t('translate.ejs.yourVerificationCode'),
      enterThisCodeInYourApp: this.i18n.t(
        'translate.ejs.enterThisCodeInYourApp',
      ),
      thisCodeWillExpireIn: this.i18n.t('translate.ejs.thisCodeWillExpireIn'),
      orClickButtonVerifyMyAccount: this.i18n.t(
        'translate.ejs.orClickButtonVerifyMyAccount',
      ),
      verifyMyAccount: this.i18n.t('translate.ejs.verifyMyAccount'),
      note: this.i18n.t('translate.ejs.note'),
      noteIgnoreThisEmail: this.i18n.t('translate.ejs.noteIgnoreThisEmail'),
      needHelp: this.i18n.t('translate.ejs.needHelp'),
      contactOurSupportTeam: this.i18n.t('translate.ejs.contactOurSupportTeam'),
      othnixAllRightsReserved: this.i18n.t(
        'translate.ejs.othnixAllRightsReserved',
      ),
    };

    await this.safeSendMail({
      to: email,
      from: '"OTHNIX E-Commerce" <no-reply@thesabisway.com>',
      subject: 'Email Verification',
      template: 'otp',
      context: {
        username: name,
        verificationCode: code,
        msgs,
      },
    });
    return; // Success OTP;
  }

  public async forgetPassword({ email, code, username }: any) {
    const passResetReq = this.i18n.t('translate.otp.passResetReq'),
      weReceived = this.i18n.t('translate.otp.weReceived'),
      ignoreReq = this.i18n.t('translate.otp.ignoreReq'),
      expireCode = this.i18n.t('translate.otp.expireCode');

    await this.safeSendMail({
      to: email,
      from: '"OTHNIX E-Commerce" <no-reply@thesabisway.com>',
      subject: 'Forget Password',
      template: 'forget-password',
      context: {
        msgs: {
          passResetReq,
          weReceived,
          ignoreReq,
          expireCode,
        },
        code,
        username,
      },
    });
  }
}
