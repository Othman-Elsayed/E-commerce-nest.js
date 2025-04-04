import { Module } from '@nestjs/common';
import { AdminUserModule } from './users/admin-user.module';

@Module({
  controllers: [AdminUserModule],
})
export class AdminModule {}
