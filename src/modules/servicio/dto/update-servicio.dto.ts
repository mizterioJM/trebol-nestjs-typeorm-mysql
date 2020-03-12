import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
import { Ruta } from '../../ruta/entity/ruta.entity';
import { Jaula } from '../../jaula/entity/jaula.entity';
import { User } from '../../user/entity/user.entity';

export class UpdateServicioDto {
  @IsString()
  @IsNotEmpty()
  ruta: Ruta;

  @IsString()
  @IsNotEmpty()
  jaula: Jaula;

  @IsString()
  @IsNotEmpty()
  chofer: User;

  @IsString()
  apoyoA?: User;

  @IsString()
  apoyoB?: User;
}
