import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Types } from 'mongoose';

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    },
  },
  timestamps: true,
})
export class Comment {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  likes: Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Comment',
  })
  replays: Types.ObjectId[];
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
