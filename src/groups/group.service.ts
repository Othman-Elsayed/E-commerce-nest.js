import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Group } from './schemas/group.schema';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {}

  async createGroup() {
    const group = await this.groupModel.find();
  }
}
