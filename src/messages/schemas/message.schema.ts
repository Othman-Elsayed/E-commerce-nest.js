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
