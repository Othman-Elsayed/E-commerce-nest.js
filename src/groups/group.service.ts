import { ChatService } from './../chats/chat.service';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';
import { CreateGroupDto } from './dtos/create-group.dto';
import { PrivacySetting } from '@utils/constants';
import { FriendsService } from 'src/friends/friends.service';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
    private readonly chatService: ChatService,
    private readonly friendsService: FriendsService,
  ) {}

  async createGroup(dto: CreateGroupDto, user: any) {
    const newChat: any = await this.chatService.createChat({
      members: [user._id],
    });
    const payload = {
      ...dto,
      chat: newChat._id,
      owner: user._id,
      admins: [user._id],
    };
    const group = await this.groupModel.create(payload);
    return group;
  }

  async joinUser(group: string, user: any) {
    const findGroup = await this.groupModel.findById(group);
    const findChat: any = await this.chatService.findChat({
      _id: findGroup?.chat,
    });

    if (findGroup?.privacyJoin === PrivacySetting.PUBLIC) {
      await this.addUserInChat(findChat._id, user._id);
    }

    if (findGroup?.privacyJoin === PrivacySetting.FRIENDS_ONLY) {
      await this.friendsService.isUserFriend({
        user: user._id,
        friend: findChat.owner,
      });
      await this.addUserInChat(findChat._id, user._id);
    }

    if (findGroup?.privacyJoin === PrivacySetting.PRIVATE) {
      const sendReq = await this.groupModel.findByIdAndUpdate(
        group,
        { $addToSet: { requestsJoin: user } },
        { new: true },
      );
      if (!sendReq)
        throw new InternalServerErrorException('failed request join group');

      return sendReq;
    }
  }

  async acceptJoin(group: string, user: any) {
    const findGroup: any = await this.groupModel.findById(group);
    if (findGroup?.owner.toString() === user._id) {
      await this.groupModel.findByIdAndUpdate(
        group,
        {
          $pull: { requestsJoin: user },
        },
        { new: true },
      );
      await this.addUserInChat(findGroup?.chat, user);
    }

    throw new BadRequestException("can't accept this request join");
  }

  async rejectJoin(group: string, user: any) {
    const findGroup: any = await this.groupModel.findById(group);
    if (findGroup?.owner.toString() === user._id) {
      const rejectReq = await this.groupModel.findByIdAndUpdate(
        group,
        {
          $pull: { requestsJoin: user },
        },
        { new: true },
      );

      return rejectReq;
    }

    throw new BadRequestException("can't reject this request join");
  }

  async addUserInChat(chat: string, user: string) {
    const dtoUpdateChat = {
      _id: chat,
      $addToSet: { members: user },
    };
    const addUserInChat = await this.chatService.updateChat(dtoUpdateChat);
    return addUserInChat;
  }
}
