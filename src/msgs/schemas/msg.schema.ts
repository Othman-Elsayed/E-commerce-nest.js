import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
export class Message {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  })
  chat: Types.ObjectId;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  writer: Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  likes: Types.ObjectId[];

  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Message',
  })
  replays: Types.ObjectId[];

  @Prop({
    type: String,
  })
  text: string;

  @Prop({
    type: Object,
  })
  imgs: ImgType[];

  @Prop({
    type: Object,
  })
  videos: VideoType[];

  @Prop({
    type: String,
  })
  record: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isSeen: boolean;

  @Prop({
    type: Boolean,
    default: false,
  })
  isEdit: boolean;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
