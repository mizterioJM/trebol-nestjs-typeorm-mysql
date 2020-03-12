import { IsNumber, IsString } from 'class-validator';

export class ReadUserFechaDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  apellido: string;

  @IsString()
  dias: string;
}
