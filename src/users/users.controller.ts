import { ResponseMeta } from '@shared/decorators/response.decorator';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

@Controller('users/me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ResponseMeta({ message: 'translate.users.retrieved' })
  public async getAll(@Request() req: any) {
    return this.usersService.getMyProfile(req.user._id);
  }

  @Put()
  @ResponseMeta({ message: 'translate.users.updatedMyProfile' })
  public async updateMyProfile(
    @Request() req: any,
    @Body() dto: UpdateMyProfileDto,
  ): Promise<any> {
    return this.usersService.updateProfile(req.user._id, dto);
  }

  // @Post()
  // @ResponseMeta({ message: 'translate.users.' })
  // public async edit(
  //   @Query('userId') userId: string,
  //   @Body() dto: UpdateUserDto,
  // ) {
  //   // return this.usersService.
  // }

  // @Delete()
  // @ResponseMeta({ message: 'translate.users.deleted' })
  // public async remove(@Query('userId') userId: string): Promise<any> {
  //   return this.usersService.removeUser(userId);
  // }
}
