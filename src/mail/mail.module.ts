import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from 'src/mail/schemas/otp.schema';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }])],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
