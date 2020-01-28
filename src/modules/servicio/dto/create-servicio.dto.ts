import { IsNumber, IsNotEmpty, IsObject } from 'class-validator';
import { Ruta } from '../../ruta/entity/ruta.entity';
import { Jaula } from '../../jaula/entity/jaula.entity';
import { User } from '../../user/entity/user.entity';
import { ImgDetail } from '../entity/servicio-img-detail.entity';

export class CreateServicioDto {
  @IsNotEmpty()
  readonly ruta: Ruta;

  @IsNotEmpty()
  readonly jaula: Jaula;

  @IsNotEmpty()
  readonly chofer: User;

  @IsNotEmpty()
  readonly apoyoA?: User;

  @IsNotEmpty()
  readonly apoyoB?: User;

  readonly image: ImgDetail[];
}
