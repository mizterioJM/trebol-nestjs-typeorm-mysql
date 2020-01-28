import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Jaula } from '../../jaula/entity/jaula.entity';
import { Ruta } from '../../ruta/entity/ruta.entity';
import { User } from '../../user/entity/user.entity';
import { ImgDetail } from './servicio-img-detail.entity';

@Entity('servicios')
export class Servicio extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(type => Ruta, ruta => ruta.servicios, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'ruta_id' })
  ruta: Ruta;

  @ManyToOne(type => Jaula, jaula => jaula.servicios, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'jaula_id' })
  jaula: Jaula;

  @ManyToOne(type => User, user => user.servicio, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'chofer_id' })
  chofer: User;

  @ManyToOne(type => User, user => user.servicio, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'apoyoA_id' })
  apoyoA: User;

  @ManyToOne(type => User, user => user.servicio, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinColumn({ name: 'apoyoB_id' })
  apoyoB: User;

  @OneToMany(type => ImgDetail, imgDetail => imgDetail.servicio, {
    cascade: true,
    eager: true,
    nullable: true,
  })
  @JoinTable()
  img_detail: ImgDetail[];
}
