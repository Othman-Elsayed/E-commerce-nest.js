import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin-user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/modules/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [AdminUsersController],
})
export class AdminUserModule {}
