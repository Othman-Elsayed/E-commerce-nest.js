import { IsNotEmpty, IsString } from 'class-validator';

export class CloudinaryDto {
  @IsNotEmpty()
  @IsString()
  uri: string;

  @IsNotEmpty()
  @IsString()
  public_id: string;
}
