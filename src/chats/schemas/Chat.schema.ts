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
export class Chat {
  @Prop({
    required: true,
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  members: Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  })
  msgOverwrite: string;

  // Group Chat
  @Prop({
    type: Boolean,
    default: false,
  })
  isGroup: boolean;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
