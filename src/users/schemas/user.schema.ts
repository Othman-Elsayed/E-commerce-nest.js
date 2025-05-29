import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Cloudinary,
  GenderUser,
  RolesUser,
  ViableUserInformation,
} from '@shared/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    minlength: 3,
    maxlength: 30,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    minlength: 3,
    maxlength: 200,
    select: false,
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  })
  username: string;

  @Prop({
    type: String,
    minlength: 3,
    maxlength: 100,
    required: true,
    select: false,
  })
  password: string;

  @Prop({
    type: [String],
    enum: RolesUser,
    default: [RolesUser.USER],
  })
  role: RolesUser[];

  @Prop({
    type: {
      uri: { type: String },
      public_id: { type: String },
    },
    default: null,
  })
  avatar: Cloudinary;

  @Prop({
    type: Number,
    min: 0,
    max: 100,
  })
  age: number;

  @Prop({
    type: String,
    length: 11,
    select: false,
  })
  phoneNumber: string;

  @Prop({
    type: String,
    enum: ViableUserInformation,
    default: ViableUserInformation.none,
    select: false,
  })
  visibleInfo: ViableUserInformation;

  @Prop({
    type: String,
    maxlength: 255,
  })
  address: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  @Prop({
    type: String,
    select: false,
  })
  verificationCode: string;

  @Prop({
    type: String,
    enum: GenderUser,
  })
  gender: GenderUser;
}

export const UserSchema = SchemaFactory.createForClass(User);
