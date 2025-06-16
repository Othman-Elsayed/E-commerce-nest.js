import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Cloudinary } from '@shared/constants';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({
    type: String,
    trim: true,
    unique: true,
    required: true,
  })
  name: string;

  @Prop({
    type: String,
    trim: true,
  })
  description: string;

  @Prop({
    type: {
      uri: { type: String },
      public_id: { type: String },
    },
    default: null,
  })
  img: Cloudinary;

  @Prop({
    type: [MongooseSchema.Types.ObjectId],
    ref: 'Category',
    default: [],
  })
  parent: Types.ObjectId[];

  @Prop({
    type: Boolean,
    default: true,
  })
  isActive: boolean;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    select: false,
  })
  createdBy: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'User',
    select: false,
  })
  updatedBy: Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
