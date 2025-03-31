import { ImgType, VideoType } from '@utils/types';
import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMsgDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  replays?: string[];

  @IsOptional()
  @IsBoolean()
  isEdit?: boolean;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  record?: string;

  @IsOptional()
  @IsArray()
  imgs?: ImgType[];

  @IsOptional()
  @IsArray()
  videos?: VideoType[];
}
