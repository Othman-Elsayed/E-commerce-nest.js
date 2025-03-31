import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/Post.schema';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { omit } from 'lodash';
@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) {}

  async findAllPosts() {
    const posts = await this.postModel.find().lean();
    return posts.map((post) => omit(post, ['__v']));
  }

  async findPostsBy(filter: any) {
    const posts = await this.postModel.find(filter).lean();
    return posts.map((post) => omit(post, ['__v']));
  }

  async findPostBy(filter: any) {
    const post: any = await this.postModel.findOne(filter).lean();
    if (!post) throw new NotFoundException('post not found');
    return omit(post, ['__v']);
  }

  async createPost(dto: CreatePostDto, user: any) {
    const post = await this.postModel.create({ ...dto, user: user._id });
    return post;
  }

  async updatePost(dto: UpdatePostDto, user: any) {
    const findOwner = await this.findPostBy({ _id: dto._id });

    if (!findOwner) {
      throw new NotFoundException('post not found.');
    }

    if (findOwner.user?.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "you don't have permission to edit this post.",
      );
    }

    const post = await this.postModel.findByIdAndUpdate({ _id: dto._id }, dto, {
      new: true,
    });

    if (!post)
      throw new InternalServerErrorException('failed to update the post.');

    return post;
  }

  async removePostById(_id: any, user: any) {
    const findPost = await this.findPostBy({ _id });

    if (!findPost) {
      throw new NotFoundException('post not found.');
    }

    if (findPost.user?.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "you don't have permission to remove this post.",
      );
    }

    const post = await this.postModel.findByIdAndDelete(_id);

    if (!post)
      throw new InternalServerErrorException('failed to update the post.');

    return post;
  }
}
