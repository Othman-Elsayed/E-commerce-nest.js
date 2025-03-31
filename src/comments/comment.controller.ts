import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';
import { CommentService } from './comment.service';
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
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update.comment.dto';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { RolesDecorator } from '@auth/decorator/roles.decorator';
import { RolesType } from '@utils/constants';
import { VerifyRoles } from '@auth/guards/verify-roles.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('admin')
  @RolesDecorator(RolesType.ADMIN)
  @UseGuards(VerifyRoles)
  getCommentsForAdmin() {
    return this.commentService.findCommentsForAdmin();
  }

  @Get('one')
  getComment(@Query('_id', ValidateMongoId) _id: string) {
    return this.commentService.findComment({ _id });
  }

  @Get()
  getComments(@Query('postId', ValidateMongoId) post: string) {
    return this.commentService.findComments({ post: post });
  }

  @Post()
  @UseGuards(VerifyToken)
  createComment(@Body() dto: CreateCommentDto, @Request() req: any) {
    return this.commentService.addComment(dto, req.user);
  }

  @Put()
  @UseGuards(VerifyToken)
  updateComment(@Body() dto: UpdateCommentDto, @Request() req: any) {
    return this.commentService.editComment(dto, req.user);
  }

  @Delete()
  @UseGuards(VerifyToken)
  removeComment(
    @Query('_id', ValidateMongoId) _id: string,
    @Request() req: any,
  ) {
    return this.commentService.removeComment(_id, req.user);
  }
}
