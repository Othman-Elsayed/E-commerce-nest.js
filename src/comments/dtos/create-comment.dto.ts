import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  post: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
