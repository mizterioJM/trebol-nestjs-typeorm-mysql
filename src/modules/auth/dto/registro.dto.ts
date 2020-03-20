import { IsString, IsNotEmpty } from 'class-validator';

export class RegistroDto {
  @IsString()
  nDocument: string;

  @IsString()
  password: string;

  @IsString()
  name: string;

  @IsString()
  lastname: string;

  fecha_nac?: Date;

  chofer: boolean;
}
