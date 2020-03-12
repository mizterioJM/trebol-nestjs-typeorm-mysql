import { IsNotEmpty } from 'class-validator';
import { Ruta } from '../../ruta/entity/ruta.entity';
import { Jaula } from '../../jaula/entity/jaula.entity';
import { User } from '../../user/entity/user.entity';
import { ImgDetail } from '../entity/servicio-img-detail.entity';
import { CreateServicioImgDto } from './create-service-img-detail.dto';
import { Vehicle } from '../../vehicle/entity/vehicle.entity';

export class CreateServicioDto {
  @IsNotEmpty()
  readonly ruta: Ruta;

  @IsNotEmpty()
  readonly jaula: Jaula;

  @IsNotEmpty()
  readonly vehicle: Vehicle;

  @IsNotEmpty()
  readonly chofer: User;

  @IsNotEmpty()
  readonly apoyoA?: User;

  @IsNotEmpty()
  readonly apoyoB?: User;

  readonly img_detail: CreateServicioImgDto;
}
