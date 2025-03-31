import { IsMongoId, IsOptional } from 'class-validator';

export class UpdateChatDto {
  @IsOptional()
  @IsMongoId()
  _id: string;

  @IsOptional()
  @IsMongoId({ each: true })
  members?: [];

  @IsOptional()
  @IsMongoId()
  msgOverwrite?: string;
}
