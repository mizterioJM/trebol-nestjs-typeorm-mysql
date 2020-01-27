import { ReadServicioRutaDto } from './read-servicio-ruta.dto';
import { ReadServicioJaulaDto } from './read-servicio-jaula.dto';
import { ReadServicioUserDto } from './read-servicio-user.dto';
import { Exclude, Expose, Type } from 'class-transformer';
import { IsNumber, IsDate } from 'class-validator';

@Exclude()
export class ReadServicioDto {
  @Expose()
  @IsNumber()
  readonly id: number;

  @Expose()
  @Type(type => ReadServicioRutaDto)
  readonly ruta: ReadServicioRutaDto;

  @Expose()
  @Type(type => ReadServicioJaulaDto)
  readonly jaula: ReadServicioJaulaDto;

  @Expose()
  @Type(type => ReadServicioUserDto)
  readonly chofer: ReadServicioUserDto;

  @Expose()
  @Type(type => ReadServicioUserDto)
  readonly apoyoA: ReadServicioUserDto;

  @Expose()
  @Type(type => ReadServicioUserDto)
  readonly apoyoB: ReadServicioUserDto;

  @Expose()
  @IsDate()
  readonly createAt: Date;
}
