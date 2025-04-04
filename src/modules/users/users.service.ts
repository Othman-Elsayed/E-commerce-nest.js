import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { FindUserDto } from '@shared/dtos/find-user.dto';
import { CreateUserDto } from '../admin/users/dtos/create-user.dto';
import { UpdateUserDto } from '../admin/users/dtos/update-user.dto';
import { BanUserDto } from '../admin/users/dtos/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll() {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findOne(filter: FindUserDto) {
    const user = await this.userModel.findOne(filter).exec();
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userModel.create(dto);
    return user;
  }

  async update(filter: FindUserDto, dto: UpdateUserDto) {
    const userUpdate = await this.userModel
      .findOneAndUpdate(filter, dto, {
        new: true,
      })
      .exec();

    if (!userUpdate) throw new NotFoundException('user does not exist');
    return userUpdate;
  }

  async banUser(dto: BanUserDto) {
    const userBan = await this.update({ _id: dto._id }, { active: false });
    return userBan;
  }
}
