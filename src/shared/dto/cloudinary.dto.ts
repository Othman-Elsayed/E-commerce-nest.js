import { IsNotEmpty, IsString } from 'class-validator';

export class CloudinaryDto {
  @IsString()
  @IsNotEmpty({ message: 'uri is required' })
  uri: string;

  @IsString()
  @IsNotEmpty({ message: 'public_id is required' })
  public_id: string;
}
