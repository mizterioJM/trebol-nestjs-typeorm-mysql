import { IsString, IsNotEmpty } from 'class-validator';

export class RegistroDto {
  @IsString()
  @IsNotEmpty()
  nDocument: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  name: string;

  lastname: string;

  fecha_nac?: Date;

  chofer: boolean;
}
