import { IsString, MaxLength, IsNumber } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ReadRoleDto {
  @IsNumber()
  @Expose()
  readonly id: number;

  @Expose()
  @IsString()
  @MaxLength(20, { message: 'Este nombre es invalido' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'Maximo de Caracteres' })
  readonly description: string;
}
