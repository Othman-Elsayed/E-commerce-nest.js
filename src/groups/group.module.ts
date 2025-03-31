import { forwardRef, Module } from '@nestjs/common';
import { ChatModule } from 'src/chats/chat.module';
import { GroupService } from './group.service';
import { FriendsModule } from 'src/friends/friends.module';
import { GroupController } from './group.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Group, GroupSchema } from './schemas/group.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
    forwardRef(() => ChatModule),
    FriendsModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
