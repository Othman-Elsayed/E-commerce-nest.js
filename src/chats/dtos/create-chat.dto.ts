import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateChatDto {
  @IsNotEmpty()
  @IsMongoId({ each: true })
  members: [];

  @IsOptional()
  @IsMongoId()
  msgOverwrite?: string;

  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;
}
