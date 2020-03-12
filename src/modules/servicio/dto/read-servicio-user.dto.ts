import { Expose, Exclude, Type } from 'class-transformer';
import { ReadServicioUserDetail } from './read-servicio-user-details.dto';
import { IsNumber } from 'class-validator';

@Exclude()
export class ReadServicioUserDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  readonly nDocument: number;

  @Expose()
  @Type((type) => ReadServicioUserDetail)
  readonly details: ReadServicioUserDetail;
}
