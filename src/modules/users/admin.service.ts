import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BanUserDto } from './dtos/ban-user.dto';
import { FindUserDto } from './dtos/find-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  findAll() {
    return this.userModel.find();
  }

  findOne(filter: FindUserDto) {
    return this.userModel.findOne(filter);
  }

  create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  update(dto: UpdateUserDto) {}

  banUser(dto: BanUserDto) {}
}
