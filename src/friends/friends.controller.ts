import { VerifyToken } from '@auth/guards/verify-token.guard';
import { FriendsService } from './friends.service';
import {
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}
  @Get()
  @UseGuards(VerifyToken)
  getMyFollows(@Request() req: any) {
    return this.friendsService.getMyFollows(req.user);
  }

  @Post('follow')
  @UseGuards(VerifyToken)
  follow(@Query('user', ValidateMongoId) user: string, @Request() req: any) {
    return this.friendsService.follow(req.user, user);
  }

  @Post('unfollow')
  @UseGuards(VerifyToken)
  unfollow(@Query('user', ValidateMongoId) user: string, @Request() req: any) {
    return this.friendsService.unfollow(req.user, user);
  }
}
