import { omit } from 'lodash';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chat } from './schemas/Chat.schema';
import { Model } from 'mongoose';
import { CreateChatDto } from './dtos/create-chat.dto';
import { UpdateChatDto } from './dtos/update-chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
  ) {}

  async findAllChatsForAdmin() {
    const chats = await this.chatModel.find();
    return chats;
  }

  async findMyChats(user: any) {
    const chats = await this.chatModel
      .find({ members: user._id })
      .populate('members', 'name img')
      .populate('lastMessage')
      .lean();

    return chats.map((chat) => omit(chat, ['__v']));
  }

  async findChat(filter: any) {
    const findChat = await this.chatModel.findOne(filter).lean();
    if (!findChat) throw new NotFoundException('chat not found');
    return findChat;
  }

  async createChat(dto: CreateChatDto) {
    const chat = await this.chatModel.create(dto);
    if (!chat) return new InternalServerErrorException('failed to create.');
    return chat;
  }

  async updateChat(dto: any) {
    const chat = await this.chatModel.findByIdAndUpdate(dto._id, dto, {
      new: true,
    });
    if (!chat)
      return new InternalServerErrorException('failed to update the chat.');
    return chat;
  }

  async removeChat(_id: string) {
    const chat = await this.chatModel.findByIdAndDelete(_id);
    return chat;
  }
}
