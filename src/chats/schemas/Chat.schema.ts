import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PrivacySetting } from '@utils/constants';
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

  @Prop({
    enum: PrivacySetting,
    default: PrivacySetting.FRIENDS_ONLY,
  })
  joinGroup: PrivacySetting;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  requestsJoin: Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  })
  admins: Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  owner: Types.ObjectId[];
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
