import { BaseModel } from '../../../shared/base.model';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Servicio } from './servicio.entity';

@Entity('img_detail')
export class ImgDetail extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
  })
  img_id: string;

  @Column({
    nullable: true,
  })
  img_url: string;

  @Column({
    nullable: true,
  })
  secure_url: string;

  @ManyToOne(type => Servicio, servicio => servicio.img_detail)
  servicio: Servicio;
}
