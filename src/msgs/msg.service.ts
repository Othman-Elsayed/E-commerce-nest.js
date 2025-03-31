import { InjectModel } from '@nestjs/mongoose';
import { Message } from './schemas/msg.schema';
import { Model } from 'mongoose';
import { CreateMsgDto } from './dtos/create-msg.dto';
import { UpdateMsgDto } from './dtos/update-msg.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class MsgService {
  constructor(
    @InjectModel(Message.name) private readonly msgModel: Model<Message>,
  ) {}

  async getChatMessages(chat: string) {
    const msgs = await this.msgModel.findOne({ chat });
    return msgs;
  }

  async createMsg(dto: CreateMsgDto, user: any) {
    const msg = await this.msgModel.create({ ...dto, writer: user._id });
    if (!msg) throw new InternalServerErrorException('failed create msg');
    return msg;
  }

  async editMsg(dto: UpdateMsgDto, user: any) {
    const findMsg = await this.msgModel.findById(dto._id);
    if (findMsg?.writer.toString() === user._id.toString()) {
      const msg = await this.msgModel.findByIdAndUpdate(dto._id, dto, {
        new: true,
      });
      if (!msg) throw new InternalServerErrorException('failed edit msg');
      return msg;
    }
    throw new BadRequestException("can't edit this message");
  }

  async removeMsg(msg: string, user: any) {
    const findMsg = await this.msgModel.findById(msg);

    if (findMsg?.writer.toString() === user._id.toString()) {
      const removeMsg = await this.msgModel.findByIdAndDelete(msg);
      if (!removeMsg)
        throw new InternalServerErrorException('failed remove msg');
      return removeMsg;
    }

    throw new BadRequestException("can't remove this message");
  }
}
