import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageSchema } from './schemas/message.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<Message>,
  ) {}

  async getChatMessages(chat: string) {
    const msgs = await this.messageModel.findOne({ chat });
    return msgs;
  }

  async createMsg(chat: string) {
    // const msgs = await this.messageModel.findOne({ chat });
    // return msgs;
  }
}
