import { PrivacySetting } from '@utils/constants';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateGroupDto {
  @IsOptional()
  @IsString()
  @IsEnum(PrivacySetting)
  privacyJoin?: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  requestsJoin: string;
}
