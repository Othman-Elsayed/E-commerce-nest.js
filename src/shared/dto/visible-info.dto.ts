import { IsBoolean } from 'class-validator';

export class VisibleInfoDto {
  @IsBoolean()
  email?: boolean;

  @IsBoolean()
  phoneNumber?: boolean;

  @IsBoolean()
  avatar?: boolean;

  @IsBoolean()
  bio?: boolean;

  @IsBoolean()
  age?: boolean;

  @IsBoolean()
  address?: boolean;

  @IsBoolean()
  lastSeen?: boolean;
}
