import { ResponseMeta } from '@shared/decorators/response.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
