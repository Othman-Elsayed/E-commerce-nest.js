import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}
  public getAllUsers() {
    return this.userRepository.findAll();
  }
  public createUser(dto: CreateUserDto) {
    return this.userRepository.create(dto);
  }
  public editUser(userId: string, dto: UpdateUserDto) {
    return this.userRepository.edit(userId, dto);
  }
  public removeUser(userId: string) {
    return this.userRepository.remove(userId);
  }
}
// {
//     "message": "asffff",
//     "error": "Not Found",
//     "statusCode": 404
// }
