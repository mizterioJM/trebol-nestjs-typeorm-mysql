import { IsString } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadServicioRutaDto {
  @Expose()
  @IsString()
  readonly name: string;
}
