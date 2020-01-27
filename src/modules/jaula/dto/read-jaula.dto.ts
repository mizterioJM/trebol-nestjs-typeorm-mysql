import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class ReadJaulaDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @IsNumber()
  readonly code: number;

  @Expose()
  @IsString()
  readonly description: string;
}
