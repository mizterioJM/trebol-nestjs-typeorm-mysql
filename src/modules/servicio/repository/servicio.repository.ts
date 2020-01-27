import { Repository, EntityRepository } from 'typeorm';
import { Servicio } from '../entity/servicio.entity';

@EntityRepository(Servicio)
export class ServicioRepository extends Repository<Servicio> {}
