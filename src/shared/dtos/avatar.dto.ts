import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UserAvatarDto {
  // required fields
  @IsNotEmpty()
  @IsString()
  public_id: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}
