import { BaseModel } from '../../../shared/base.model';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Servicio } from '../../servicio/entity/servicio.entity';
import { Status } from '../../../shared/status.enum';

@Entity('tipo_ruta')
export class Ruta extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(type => Servicio, servicio => servicio.ruta)
  servicios: Servicio[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;
}
