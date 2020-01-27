import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateJaulaDto {
  @IsNumber()
  @MaxLength(10, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  code: number;

  @IsString()
  @MaxLength(100, { message: 'Sobrepasa el Maximo de caracteres permitido' })
  description: string;
}
