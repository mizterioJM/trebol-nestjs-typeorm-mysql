import { Exclude } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

@Exclude()
export class CreateVehicleDto {
  @IsString()
  @MaxLength(10, { message: 'Sobrepasa el maximo de caracteres permitido' })
  placa: string;

  @IsString()
  @MaxLength(100, { message: 'sobrepasa el maximo de caracteres permitido' })
  description: string;
}
