import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/User.schema';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dtos/register.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Roles } from '@utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    const users = await this.userModel.find();
    return users;
  }

  async findOne(filter: any, roles?: Roles) {
    let user: any;
    if (roles?.includes(Roles.ADMIN)) {
      user = await this.userModel
        .findOne(filter)
        .select('+password +email +phoneNumber');
    } else {
      user = await this.userModel.findOne(filter);
    }
    return user;
  }

  async create(dto: RegisterDto) {
    const user = await this.userModel.create(dto);
    return user;
  }

  async update(dto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(dto._id, dto, {
      new: true,
    });
    if (!user) return new NotFoundException('user dose not exist');
    return user;
  }
}
