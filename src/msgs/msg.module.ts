import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/msg.schema';
import { MsgService } from './msg.service';
import { MsgController } from './msg.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [MsgController],
  providers: [MsgService],
})
export class MsgModule {}
