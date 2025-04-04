import { Injectable, NotFoundException } from '@nestjs/common';
import { BanUserDto } from './dtos/ban-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { FindUserDto } from '@shared/dtos/find-user.dto';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UsersService) {}

  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }

  async findOne(filter: FindUserDto) {
    const user = await this.userService.findOne(filter);
    return user;
  }

  async create(dto: CreateUserDto) {
    const user = await this.userService.create(dto);
    return user;
  }

  async update(filter: FindUserDto, dto: UpdateUserDto) {
    const userUpdate = await this.userService.update(filter, dto);

    if (!userUpdate) throw new NotFoundException('user does not exist');
    return userUpdate;
  }

  async banUser(dto: BanUserDto) {
    const userBan = await this.update({ _id: dto._id }, { active: false });
    return userBan;
  }
}
