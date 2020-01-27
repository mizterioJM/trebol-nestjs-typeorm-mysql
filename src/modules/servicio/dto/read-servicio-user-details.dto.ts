import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadServicioUserDetail {
  @Expose()
  readonly name: string;

  @Expose()
  readonly lastname: string;
}
