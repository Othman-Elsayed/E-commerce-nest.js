import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PrivacySetting, RolesType } from '@utils/constants';
import { ImgType } from '@utils/types';

@Schema({
  toJSON: {
    transform(doc, ret) {
      delete ret.__v;
    },
  },
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  // flags hidden
  @Prop({
    required: true,
    type: String,
    trim: true,
    lowercase: true,
    select: false,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    select: false,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    type: String,
    select: false,
  })
  password: string;

  @Prop({
    type: String,
    enum: PrivacySetting,
    default: PrivacySetting.PRIVATE,
    select: false,
  })
  emailPrivacy: string;

  @Prop({
    type: String,
    enum: PrivacySetting,
    default: PrivacySetting.PRIVATE,
    select: false,
  })
  phonePrivacy: string;
  // flags hidden

  @Prop({
    enum: RolesType,
    default: RolesType.USER,
  })
  roles: string;

  @Prop({
    type: String,
  })
  bio: string;

  @Prop({
    type: [],
  })
  imgs: ImgType[];

  @Prop({
    type: String,
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    default: null,
    select: false,
  })
  verifyToken: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isVerified: boolean;

  @Prop({
    type: Number,
    default: 0,
  })
  followers: number;

  @Prop({
    type: Number,
    default: 0,
  })
  following: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
