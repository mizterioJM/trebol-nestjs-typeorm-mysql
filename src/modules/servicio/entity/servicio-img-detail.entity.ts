import { BaseModel } from '../../../shared/base.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Servicio } from './servicio.entity';

@Entity('img_detail')
export class ImgDetail extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    nullable: true,
  })
  img_id?: string;

  @Column({
    nullable: true,
  })
  img_url?: string;

  @Column({
    nullable: true,
  })
  secure_url?: string;

  @Column({
    nullable: true,
    type: 'longtext',
  })
  base64?: string;

  @ManyToOne((type) => Servicio, (servicio) => servicio.img_detail, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'servicio_id' })
  servicio: Servicio;
}
