import { Exclude, Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

@Exclude()
export class ReadServicioVehicleDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsString()
  readonly placa: string;
}
