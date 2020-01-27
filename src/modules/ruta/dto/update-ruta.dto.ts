import { IsString, MaxLength } from 'class-validator';

export class UpdateRutaDto {
  @IsString()
  @MaxLength(10, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  name: string;

  @IsString()
  @MaxLength(100, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  description: string;
}
