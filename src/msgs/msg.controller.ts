import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { CreateMsgDto } from './dtos/create-msg.dto';
import { UpdateMsgDto } from './dtos/update-msg.dto';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';
import { MsgService } from './msg.service';

@Controller('msgs')
@UseGuards(VerifyToken)
export class MsgController {
  constructor(private readonly msgService: MsgService) {}

  @Get()
  getChatMsg(@Query('chatId', ValidateMongoId) chatId: string) {
    return this.msgService.getChatMessages(chatId);
  }

  @Post()
  createMsg(@Body() dto: CreateMsgDto, @Request() req: any) {
    return this.msgService.createMsg(dto, req.user);
  }

  @Put()
  editMsg(@Body() dto: UpdateMsgDto, @Request() req: any) {
    return this.msgService.editMsg(dto, req.user);
  }

  @Delete()
  removeMsg(
    @Query('msgId', ValidateMongoId) msgId: string,
    @Request() req: any,
  ) {
    return this.msgService.removeMsg(msgId, req.user);
  }
}
