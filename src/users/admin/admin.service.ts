import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { CreateUserDto } from './dto/admin-create-user.dto';
import { UpdateUserDto } from './dto/admin-update-user.dto';

@Injectable()
export class AdminService {
  constructor(private readonly userRepository: UsersRepository) {}

  public getAllUsers() {
    return this.userRepository.findAll({ select: '+email +phoneNumber' });
  }

  public createUser(dto: CreateUserDto) {
    return this.userRepository.create(dto);
  }

  public editUser(userId: string, dto: UpdateUserDto) {
    return this.userRepository.edit({
      filter: { _id: userId },
      payload: dto,
    });
  }

  public removeUser(userId: string) {
    return this.userRepository.remove(userId);
  }
}
