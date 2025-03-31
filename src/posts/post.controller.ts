import { ValidateMongoId } from '@pipes/validate-mongo.id.pipe';
import { PostService } from './post.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { VerifyToken } from '@auth/guards/verify-token.guard';
import { RolesDecorator } from '@auth/decorator/roles.decorator';
import { RolesType } from '@utils/constants';
import { VerifyRoles } from '@auth/guards/verify-roles.guard';
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

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('admin')
  @RolesDecorator(RolesType.ADMIN)
  @UseGuards(VerifyRoles)
  getAllPosts() {
    return this.postService.findAllPosts();
  }

  @Get('one')
  getPostDetails(@Query('_id', ValidateMongoId) _id: string) {
    return this.postService.findPostBy({ _id });
  }

  @Get()
  getPostsByUser(@Query('user', ValidateMongoId) user: string) {
    return this.postService.findPostsBy({ user });
  }

  @Post()
  @UseGuards(VerifyToken)
  create(@Body() dto: CreatePostDto, @Request() req: any) {
    return this.postService.createPost(dto, req.user);
  }

  @Put()
  @UseGuards(VerifyToken)
  update(@Body() dto: UpdatePostDto, @Request() req: any) {
    return this.postService.updatePost(dto, req.user);
  }

  @Delete()
  @UseGuards(VerifyToken)
  remove(@Query('_id', ValidateMongoId) _id: string, @Request() req: any) {
    return this.postService.removePostById(_id, req.user);
  }
}
