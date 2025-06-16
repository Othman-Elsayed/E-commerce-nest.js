import { ResponseMeta } from '@shared/decorators/response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/admin-create-user.dto';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/admin-update-user.dto';

@Controller('/admin/users')
export class AdminController {
  constructor(private readonly usersService: AdminService) {}

  @Get()
  @ResponseMeta({ message: 'translate.users.retrieved' })
  public async getAll(): Promise<any> {
    return this.usersService.getAllUsers();
  }

  @Post()
  @ResponseMeta({ message: 'translate.users.created' })
  public async create(@Body() dto: CreateUserDto): Promise<any> {
    return this.usersService.createUser(dto);
  }

  @Put()
  @ResponseMeta({ message: 'translate.users.updated' })
  public async edit(
    @Query('userId') userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<any> {
    return this.usersService.editUser(userId, dto);
  }

  @Delete()
  @ResponseMeta({ message: 'translate.users.deleted' })
  public async remove(@Query('userId') userId: string): Promise<any> {
    return this.usersService.removeUser(userId);
  }
}
