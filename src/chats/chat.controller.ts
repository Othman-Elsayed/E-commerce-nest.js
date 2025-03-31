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

@Controller()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}
  @Get('admin/chats')
  @RolesDecorator(RolesType.ADMIN)
  @UseGuards(VerifyRoles)
  getAllChatsByAdmin() {
    return this.chatService.findAllChatsForAdmin();
  }

  @Get('chats')
  @UseGuards(VerifyToken)
  getMyChats(@Request() req: any) {
    return this.chatService.findMyChats(req.user);
  }

  @Post('chat')
  @UseGuards(VerifyToken)
  create(@Body() dto: CreateChatDto) {
    return this.chatService.createChat(dto);
  }

  @Delete('chat')
  @UseGuards(VerifyToken)
  delete(@Query('chatId', ValidateMongoId) chatId: string) {
    return this.chatService.removeChat(chatId);
  }
}
