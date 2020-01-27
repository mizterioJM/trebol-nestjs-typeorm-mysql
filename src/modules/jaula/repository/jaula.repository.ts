import { Repository, EntityRepository } from 'typeorm';
import { Jaula } from '../entity/jaula.entity';

@EntityRepository(Jaula)
export class JaulaRepository extends Repository<Jaula> {}
