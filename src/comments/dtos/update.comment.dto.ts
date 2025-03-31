import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  likes?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  replays?: string;
}
