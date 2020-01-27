import { IsNumber, IsNotEmpty } from 'class-validator';
import { Ruta } from '../../ruta/entity/ruta.entity';
import { Jaula } from '../../jaula/entity/jaula.entity';
import { User } from '../../user/entity/user.entity';

export class UpdateServicioDto {
  @IsNumber()
  @IsNotEmpty()
  ruta: Ruta;

  @IsNumber()
  @IsNotEmpty()
  jaula: Jaula;

  @IsNumber()
  @IsNotEmpty()
  chofer: User;

  @IsNumber()
  apoyoA?: User;

  @IsNumber()
  apoyoB?: User;
}
