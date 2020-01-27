import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { BaseModel } from '../../../shared/base.model';
import { Status } from '../../../shared/status.enum';
import { User } from '../../user/entity/user.entity';

@Entity('roles')
export class Role extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVO })
  status: Status;

  @ManyToMany(type => User, user => user.roles)
  @JoinColumn()
  users: User[];
}
