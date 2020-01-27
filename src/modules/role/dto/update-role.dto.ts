import { IsString, MaxLength } from 'class-validator';
export class UpdateRoleDto {
  @IsString()
  @MaxLength(20, { message: 'Este nombre es invalido' })
  readonly name: string;

  @IsString()
  @MaxLength(100, { message: 'Maximo de Caracteres' })
  readonly description: string;
}
