import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Status } from '../../../shared/status.enum';
import { BaseModel } from '../../../shared/base.model';

@Entity('users_details')
export class UserDetails extends BaseModel {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: true })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  lastname: string;

  @Column({ type: 'timestamp', name: 'fecha_nac', nullable: true })
  fechaNac: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVO,
  })
  status: Status;
}
