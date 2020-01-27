import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';

@Exclude()
export class ReadServicioJaulaDto {
  @Expose()
  @IsString()
  readonly code: string;
}
