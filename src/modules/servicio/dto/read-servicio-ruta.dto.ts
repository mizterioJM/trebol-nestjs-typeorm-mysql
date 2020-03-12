import { IsString, IsNumber } from 'class-validator';
import { Expose, Exclude } from 'class-transformer';

@Exclude()
export class ReadServicioRutaDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly name: string;
}
