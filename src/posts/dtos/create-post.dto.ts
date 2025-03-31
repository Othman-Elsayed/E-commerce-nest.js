import { ImgType, VideoType } from '@utils/types';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

export class CreatePostDto {
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
