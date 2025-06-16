import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Otp, OtpSchema } from './schema/otp.schema';
import { OtpController } from './otp.controller';
import { OtpService } from './otp.service';
import { MailModule } from 'src/mail/mail.module';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from '@shared/token/token.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Otp.name, schema: OtpSchema }]),
    MailModule,
    TokenModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [OtpController],
  providers: [OtpService],
  exports: [OtpService],
})
export class OtpModule {}
