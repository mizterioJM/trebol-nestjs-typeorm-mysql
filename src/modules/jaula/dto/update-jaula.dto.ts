import { IsNumber, MaxLength, IsString } from 'class-validator';

export class UpdateJaulaDto {
  @IsNumber()
  @MaxLength(10, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  code: number;

  @IsString()
  @MaxLength(100, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  description: string;
}
