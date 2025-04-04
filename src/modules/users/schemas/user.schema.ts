import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserAvatar, UserGender, UserRole } from '../types/user';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, trim: true, required: [true, 'name is required'] })
  name: string;

  @Prop({
    type: String,
    trim: true,
    select: false,
    required: [true, 'email is required'],
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
    select: false,
    required: [true, 'password is required'],
  })
  password: string;

  @Prop({ enum: UserGender, required: [true, 'gender is required'] })
  gender: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: string;

  @Prop({ type: Object, trim: true })
  avatar: UserAvatar;

  @Prop({ type: Number, trim: true })
  age: number;

  @Prop({ type: String, select: false, trim: true })
  phoneNumber: string;

  @Prop({ type: String, trim: true })
  address: string;

  @Prop({ type: Boolean, default: true })
  active: boolean;

  @Prop({ type: String, select: false, trim: true })
  verifyCode: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
