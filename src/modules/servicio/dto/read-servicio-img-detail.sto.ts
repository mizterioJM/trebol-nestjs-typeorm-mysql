import { IsString } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadServicioImgDetailDto {
  @Expose()
  @IsString()
  readonly img_id?: string;

  @Expose()
  @IsString()
  readonly img_url?: string;

  @IsString()
  readonly secure_url?: string;
}
