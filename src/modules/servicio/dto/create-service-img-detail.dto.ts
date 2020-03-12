import { IsString } from 'class-validator';

export class CreateServicioImgDto {
  @IsString()
  img_id?: string;

  @IsString()
  img_url?: string;

  @IsString()
  secure_url?: string;

  @IsString()
  base64?: string;
}
