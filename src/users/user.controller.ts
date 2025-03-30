import { RegisterDto } from 'src/auth/dtos/register.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';
import { RolesDecorator } from '@auth/decorator/roles.decorator';
import { RolesType } from '@utils/constants';
import { VerifyRoles } from '@auth/guards/verify-roles.guard';

@Controller()
@UseGuards(VerifyToken)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  @RolesDecorator(RolesType.USER)
  @UseGuards(VerifyRoles)
  getForAdmin() {
    return this.userService.findAll();
  }
  @Get('user')
  getProfile(@Query('_id', ValidateMongoId) _id: string) {
    return this.userService.findOne({ _id });
  }

  @Post('user')
  create(@Body() dto: RegisterDto) {
    return this.userService.create(dto);
  }

  @Put('user')
  update(@Body() dto: UpdateUserDto) {
    return this.userService.update(dto);
  }
}
