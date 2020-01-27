import { Ruta } from '../entity/ruta.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(Ruta)
export class RutaRepository extends Repository<Ruta> {}
