import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { OtpModule } from 'src/otp/otp.module';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TokenModule } from '@shared/token/token.module';

@Module({
  imports: [OtpModule, UsersModule, TokenModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
