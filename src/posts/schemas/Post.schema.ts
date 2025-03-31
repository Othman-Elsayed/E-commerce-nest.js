import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PrivacySetting } from '@utils/constants';
import { ImgType, VideoType } from '@utils/types';
import mongoose, { Types } from 'mongoose';

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    },
  },
  timestamps: true,
})
export class Post {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  user: Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  likes: Types.ObjectId[];

  @Prop({
    type: Number,
    default: 0,
  })
  comments: number;

  @Prop({
    type: String,
    enum: PrivacySetting,
    default: PrivacySetting.FRIENDS_ONLY,
  })
  privacy: PrivacySetting;

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: [],
  })
  imgs: ImgType[];

  @Prop({
    type: [],
  })
  video: VideoType[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
