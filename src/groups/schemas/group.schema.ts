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
export class Group {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
  })
  chat: Types.ObjectId;

  @Prop({
    enum: PrivacySetting,
    default: PrivacySetting.FRIENDS_ONLY,
  })
  privacyJoin: PrivacySetting;

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

export const GroupSchema = SchemaFactory.createForClass(Group);
