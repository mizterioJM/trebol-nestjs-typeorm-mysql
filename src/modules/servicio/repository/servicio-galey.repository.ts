import { Repository, EntityRepository } from 'typeorm';
import { ImgDetail } from '../entity/servicio-img-detail.entity';

@EntityRepository(ImgDetail)
export class ServicioGaleryRepository extends Repository<ImgDetail> {}
