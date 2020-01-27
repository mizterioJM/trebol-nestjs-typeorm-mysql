import { BaseModel } from '../../../shared/base.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servicio } from '../../servicio/entity/servicio.entity';
import { Status } from '../../../shared/status.enum';

@Entity('jaulas')
export class Jaula extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    name: 'cod_jaula',
    nullable: false,
    unique: true,
  })
  code: number;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => Servicio, servicio => servicio.jaula)
  servicios: Servicio[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;
}
