import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  Cloudinary,
  GenderUser,
  UserFieldLimits,
  RolesUser,
  VisibleInfo,
} from '@shared/constants';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  /** 👤 Basic Identity */
  @Prop({
    type: String,
    required: true,
    trim: true,
    minlength: UserFieldLimits.minName,
    maxlength: UserFieldLimits.maxName,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: UserFieldLimits.minEmail,
    maxlength: UserFieldLimits.maxEmail,
    select: false, // hidden from queries
  })
  email: string;

  @Prop({
    type: String,
    unique: true,
    trim: true,
    minlength: UserFieldLimits.minUsername,
    maxlength: UserFieldLimits.maxUsername,
  })
  username: string;

  /** 🔒 Security */
  @Prop({
    type: String,
    required: true,
    minlength: UserFieldLimits.minPassword,
    maxlength: UserFieldLimits.maxPassword,
    select: false, // hide password
    trim: true,
  })
  password: string;

  @Prop({
    type: Boolean,
    default: false,
  })
  isEmailVerified: boolean;

  /** 🔗 Role & Permissions */
  @Prop({
    type: [String],
    enum: RolesUser,
    default: [RolesUser.USER],
  })
  roles: RolesUser[];

  /** 🖼️ Profile */
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
    min: UserFieldLimits.minAge,
    max: UserFieldLimits.maxAge,
  })
  age: number;

  @Prop({
    type: String,
    enum: GenderUser,
    default: GenderUser.NONE,
  })
  gender: GenderUser;

  @Prop({
    type: String,
    maxlength: UserFieldLimits.maxAddress,
    trim: true,
  })
  address: string;

  @Prop({
    type: Boolean,
    default: true,
  })
  active: boolean;

  /** ☎️ Contact (Private Info) */
  @Prop({
    type: String,
    length: UserFieldLimits.maxPhone,
    select: false,
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    type: Object,
    default: {
      email: false, // hide
      phoneNumber: false, // hide
      avatar: true, // show
      bio: true, // show
      age: true, // show
      address: true, // show
      lastSeen: true, // show
    },
  })
  visibleInfo: VisibleInfo;
}

export const UserSchema = SchemaFactory.createForClass(User);
