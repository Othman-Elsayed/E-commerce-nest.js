import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { EditOne, FindAll, FindOne } from '@shared/constants';
@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  public async findAll({ filter, select, populate }: FindAll) {
    try {
      const query = this.userModel.find(filter);
      if (select) {
        query.select(select);
      }
      if (populate) {
        query.populate(populate);
      }
      const users = await query;
      return users;
    } catch (err) {
      throw new InternalServerErrorException(
        'Failed fetch user, please try later again',
      );
    }
  }

  public async findOne({ filter, select, populate, failedMsg }: FindOne) {
    try {
      let query = this.userModel.findOne(filter);

      if (select) query = query.select(select);
      if (populate) query = query.populate(populate);

      const user = await query;

      if (!user) {
        throw new NotFoundException(
          failedMsg || 'This account does not exist.',
        );
      }

      return user;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      throw new InternalServerErrorException(
        'Failed to fetch user, please try again later.',
      );
    }
  }

  public async create(dto: any) {
    try {
      return await this.userModel.create(dto);
    } catch (err) {
      if (err.code === 11000) {
        throw new BadRequestException('User already exists');
      }
      throw new InternalServerErrorException('Could not create user');
    }
  }

  public async edit({ filter, payload, populate, select, failedMsg }: EditOne) {
    try {
      let query = this.userModel.findOneAndUpdate(filter, payload, {
        new: true,
      });
      if (select) query = query.select(select);
      if (populate) query = query.populate(populate);
      const user = await query;
      if (!user)
        throw new NotFoundException(
          failedMsg || 'This account does not exist.',
        );
      else return user;
    } catch (err) {
      if (err instanceof NotFoundException) throw err;
      else if (err.code === 11000)
        throw new BadRequestException('User already exists');
      else throw new BadRequestException('Could not edit user');
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
