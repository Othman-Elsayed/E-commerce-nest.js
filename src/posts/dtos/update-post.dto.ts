import { ImgType, VideoType } from '@utils/types';
import {
  IsMongoId,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePostDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsOptional()
  @IsObject()
  imgs: ImgType;

  @IsOptional()
  @IsObject()
  video: VideoType;
}
