import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';
import { PostService } from './post.service';
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
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { RolesDecorator } from '@auth/decorator/roles.decorator';
import { RolesType } from '@utils/constants';
import { VerifyRoles } from '@auth/guards/verify-roles.guard';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('admin/posts')
  @RolesDecorator(RolesType.ADMIN)
  @UseGuards(VerifyRoles)
  getAllPosts() {
    return this.postService.findAllPosts();
  }

  @Get('posts')
  getPostsByUser(@Query('user', ValidateMongoId) user: string) {
    return this.postService.findPostsBy({ user });
  }

  @Get('post')
  getPostDetails(@Query('_id', ValidateMongoId) _id: string) {
    return this.postService.findPostBy({ _id });
  }

  @Post('post')
  @UseGuards(VerifyToken)
  create(@Body() dto: CreatePostDto, @Request() req: any) {
    return this.postService.createPost(dto, req.user);
  }

  @Put('post')
  @UseGuards(VerifyToken)
  update(@Body() dto: UpdatePostDto, @Request() req: any) {
    return this.postService.updatePost(dto, req.user);
  }

  @Delete('post')
  @UseGuards(VerifyToken)
  remove(@Query('_id', ValidateMongoId) _id: string, @Request() req: any) {
    return this.postService.removePostById(_id, req.user);
  }
}
