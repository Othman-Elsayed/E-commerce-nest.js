import { VerifyToken } from '@auth/guards/verify-token.guard';
import { CreateGroupDto } from './dtos/create-group.dto';
import { GroupService } from './group.service';
import {
  Body,
  Controller,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('create')
  @UseGuards(VerifyToken)
  create(@Body() dto: CreateGroupDto, @Request() req: any) {
    return this.groupService.createGroup(dto, req.user);
  }

  @Post('join')
  @UseGuards(VerifyToken)
  joinGroup(
    @Query('groupId', ValidateMongoId) groupId: string,
    @Request() req: any,
  ) {
    return this.groupService.joinUser(groupId, req.user);
  }

  @Post('join/accept')
  @UseGuards(VerifyToken)
  accept(
    @Query('groupId', ValidateMongoId) groupId: string,
    @Request() req: any,
  ) {
    return this.groupService.acceptJoin(groupId, req.user);
  }

  @Post('join/reject')
  @UseGuards(VerifyToken)
  reject(
    @Query('groupId', ValidateMongoId) groupId: string,
    @Request() req: any,
  ) {
    return this.groupService.rejectJoin(groupId, req.user);
  }
}
