import { BaseModel } from '../../../shared/base.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Servicio } from '../../servicio/entity/servicio.entity';
import { Status } from '../../../shared/status.enum';

@Entity('vehicles')
export class Vehicle extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, nullable: false })
  placa: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany((type) => Servicio, (servicio) => servicio.vehicle)
  servicio: Servicio[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;
}
