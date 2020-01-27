import { Expose, Exclude, Type } from 'class-transformer';
import { ReadServicioUserDetail } from './read-servicio-user-details.dto';

@Exclude()
export class ReadServicioUserDto {
  @Expose()
  readonly nDocument: number;

  @Expose()
  @Type(type => ReadServicioUserDetail)
  readonly details: ReadServicioUserDetail;
}
