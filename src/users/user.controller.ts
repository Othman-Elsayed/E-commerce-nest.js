import { UserService } from './user.service';
import { Body, Controller, Get, Put, Query, UseGuards } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';

@Controller('users')
@UseGuards(VerifyToken)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(VerifyToken)
  getForAdmin() {
    return this.userService.findAll();
  }

  @Get('one')
  getProfile(@Query('_id', ValidateMongoId) _id: string) {
    return this.userService.findOne({ _id });
  }

  @Put()
  update(@Body() dto: UpdateUserDto) {
    return this.userService.update(dto);
  }
}
