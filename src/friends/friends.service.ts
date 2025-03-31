import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Friends } from './schemas/friends.schema';
import { Model } from 'mongoose';

@Injectable()
export class FriendsService {
  constructor(
    @InjectModel(Friends.name) private readonly followModel: Model<Friends>,
  ) {}

  async getMyFollows(user: any) {
    const follows = await this.followModel.find({ user }).populate('user');
    return follows;
  }

  async follow(me: any, user: string) {
    let followRecord: any = await this.followModel.findOne({
      user: me._id,
    });

    if (followRecord) {
      if (followRecord.following.includes(user)) {
        throw new BadRequestException('You are already following this user.');
      }

      followRecord = await this.followModel.findByIdAndUpdate(
        followRecord._id,
        { $addToSet: { following: user } },
        { new: true },
      );

      return followRecord;
    }

    followRecord = await this.followModel.create({
      user: me._id,
      following: [user],
    });

    return followRecord;
  }

  async unfollow(me: any, user: string) {
    const followRecord = await this.followModel.findOneAndUpdate(
      { user: me._id },
      { $pull: { following: user } },
      { new: true },
    );

    if (!followRecord)
      throw new BadRequestException('failed unfollow this user');

    return followRecord;
  }

  async isUserFollowing({ user, following }) {
    const followRecord = await this.followModel.findOne({
      user,
      following: { $in: [following] },
    });

    if (!followRecord) {
      throw new BadRequestException(
        `User ${user} is not following ${following}`,
      );
    }

    return followRecord;
  }

  async isUserFriend({ user, friend }) {
    const followRecord = await this.followModel.findOne({
      user,
      friends: { $in: [friend] },
    });

    if (!followRecord) {
      throw new BadRequestException(`User ${user} is not friend ${friend}`);
    }

    return followRecord;
  }
}
