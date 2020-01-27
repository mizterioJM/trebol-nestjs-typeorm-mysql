import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Status } from '../../../shared/status.enum';
import { UserDetails } from './user.details.entity';
import { BaseModel } from '../../../shared/base.model';
import { Role } from '../../role/entity/role.entity';
import { Servicio } from '../../servicio/entity/servicio.entity';

@Entity('users')
export class User extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 15,
    nullable: false,
    name: 'n_document',
  })
  nDocument: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @ManyToMany(type => Role, role => role.users, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToOne(type => UserDetails, {
    cascade: true,
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'detail_id' })
  details: UserDetails;

  @OneToMany(
    type => Servicio,
    servicio => [servicio.chofer, servicio.apoyoA, servicio.apoyoB],
  )
  servicio: Servicio[];

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;
}
