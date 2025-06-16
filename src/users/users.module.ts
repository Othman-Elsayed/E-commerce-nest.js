import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersRepository } from './repository/users.repository';
import { UsersController } from './users.controller';
import { OtpModule } from 'src/otp/otp.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    forwardRef(() => OtpModule),
  ],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersRepository],
})
export class UsersModule {}
