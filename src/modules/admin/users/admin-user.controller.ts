import { Controller, Get, Param, Body, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BanUserDto } from './dtos/ban-user.dto';
import { AdminService } from './admin-user.service';
import { ParseMongoIdPipe } from '@shared/pipes/parse-mongo-id.pipe';

@Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly adminService: AdminService) {}

  // ✅ Get all users
  @Get()
  getAllUsers() {
    return this.adminService.findAll();
  }

  // ✅ Get one user by ID
  @Get(':_id')
  getUserById(@Param('_id', ParseMongoIdPipe) id: string) {
    return this.adminService.findOne({ _id: id });
  }

  // ✅ Create new user
  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.adminService.create(dto);
  }

  // ✅ Update user by ID
  @Put(':_id')
  updateUser(
    @Param('_id', ParseMongoIdPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.adminService.update({ _id: id }, dto);
  }

  // ✅ Ban user by ID
  @Put('ban/:_id')
  banUser(@Param('_id', ParseMongoIdPipe) id: string, @Body() dto: BanUserDto) {
    return this.adminService.banUser({ _id: id });
  }
}
