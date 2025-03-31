import { PostService } from './../posts/post.service';
import { UserService } from './../users/user.service';
import { omit } from 'lodash';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update.comment.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
    private readonly postService: PostService,
  ) {}

  async findCommentsForAdmin() {
    const comments = (await this.commentModel.find().lean()).map((c) =>
      omit(c, ['__v']),
    );
    return comments;
  }

  async findComments(filter: any) {
    const comments = (await this.commentModel.find(filter).lean()).map((c) =>
      omit(c, ['__v']),
    );
    return comments;
  }

  async findComment(filter: any) {
    const comment = await this.commentModel.findOne(filter).lean();
    if (!comment) throw new NotFoundException('comment not found.');
    return omit(comment, ['__v']);
  }

  async addComment(dto: CreateCommentDto, user: any) {
    const isPost = await this.postService.findPostBy({ _id: dto.post });
    if (!isPost) throw new NotFoundException('post not found.');

    const comment = await this.commentModel.create({ ...dto, user: user._id });
    return comment;
  }

  async editComment(dto: UpdateCommentDto, user: any) {
    const findComment = await this.findComment({ _id: dto._id });

    if (!findComment) {
      throw new NotFoundException('comment not found.');
    }

    if (findComment.user?.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "you don't have permission to edit this comment.",
      );
    }

    const comment = await this.commentModel.findByIdAndUpdate(
      { _id: dto._id },
      dto,
      {
        new: true,
      },
    );

    if (!comment)
      throw new InternalServerErrorException('failed to update the comment.');

    return comment;
  }

  async removeComment(_id: string, user: any) {
    const findComment = await this.findComment({ _id });

    if (!findComment) {
      throw new NotFoundException('comment not found.');
    }

    if (findComment.user?.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        "you don't have permission to remove this comment.",
      );
    }

    const comment = await this.commentModel.findByIdAndDelete(_id);

    if (!comment)
      throw new InternalServerErrorException('failed to update the comment.');

    return comment;
  }
}
