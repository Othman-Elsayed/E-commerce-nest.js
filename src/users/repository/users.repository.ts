import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async findAll() {
    try {
      return await this.userModel.find();
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed fetch user, please try later again',
      );
    }
  }

  public async create(dto: CreateUserDto) {
    try {
      return await this.userModel.create(dto);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Could not create user');
    }
  }

  public async edit(userId: string, dto: UpdateUserDto) {
    try {
      return await this.userModel.findByIdAndUpdate(userId, dto, { new: true });
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Could not edit user');
    }
  }

  public async remove(userId: string) {
    try {
      return await this.userModel.findByIdAndDelete(userId);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Could not remove user');
    }
  }
}
