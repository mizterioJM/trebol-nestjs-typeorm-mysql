import { IsString, MaxLength } from 'class-validator';

export class UpdateVehicleDto {
  @IsString()
  @MaxLength(10, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  placa: string;

  @IsString()
  @MaxLength(100, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  description: string;
}
