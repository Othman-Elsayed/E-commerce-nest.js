import { RolesDecorator } from '@auth/decorator/roles.decorator';
import { ChatService } from './chat.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { RolesType } from '@utils/constants';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { VerifyRoles } from '@auth/guards/verify-roles.guard';
import { CreateChatDto } from './dtos/create-chat.dto';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('admin')
  @RolesDecorator(RolesType.ADMIN)
  @UseGuards(VerifyRoles)
  getAllChatsByAdmin() {
    return this.chatService.findAllChatsForAdmin();
  }

  @Get()
  @UseGuards(VerifyToken)
  getMyChats(@Request() req: any) {
    return this.chatService.findMyChats(req.user);
  }

  @Post()
  @UseGuards(VerifyToken)
  create(@Body() dto: CreateChatDto) {
    return this.chatService.createChat(dto);
  }

  @Delete()
  @UseGuards(VerifyToken)
  delete(@Query('chatId', ValidateMongoId) chatId: string) {
    return this.chatService.removeChat(chatId);
  }
}
