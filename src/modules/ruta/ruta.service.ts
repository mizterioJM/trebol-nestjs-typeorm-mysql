import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RutaRepository } from './repository/ruta.repository';
import { Status } from '../../shared/status.enum';
import { plainToClass } from 'class-transformer';
import { ReadRutaDto, CreateRutaDto, UpdateRutaDto } from './dto';
import { Ruta } from './entity/ruta.entity';

@Injectable()
export class RutaService {
  constructor(
    @InjectRepository(RutaRepository)
    private readonly _rutaRepository: RutaRepository,
  ) {}

  async getRuta(rutaId: number): Promise<ReadRutaDto> {
    if (!rutaId) {
      throw new BadRequestException('Id de la RUTA es REQUERIDA');
    }

    const existRuta = await this._rutaRepository.findOne(rutaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existRuta) {
      throw new NotFoundException('No existe la RUTA');
    }

    return plainToClass(ReadRutaDto, existRuta);
  }

  async getRutas(): Promise<ReadRutaDto[]> {
    const rutas = await this._rutaRepository.find({
      where: { status: Status.ACTIVO },
    });

    return rutas.map((ruta: Ruta) => plainToClass(ReadRutaDto, ruta));
  }

  async createRuta(ruta: Partial<CreateRutaDto>): Promise<ReadRutaDto> {
    const { name } = ruta;

    if (!name) {
      throw new BadRequestException('Nombre de la ruta requerida');
    }

    const saveRuta = await this._rutaRepository.save(ruta);

    return plainToClass(ReadRutaDto, saveRuta);
  }

  async updateRuta(
    rutaId: number,
    ruta: Partial<UpdateRutaDto>,
  ): Promise<ReadRutaDto> {
    if (!rutaId) {
      throw new BadRequestException('ID de la ruta es requerida');
    }

    const existRuta = await this._rutaRepository.findOne(rutaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existRuta) {
      throw new NotFoundException(' No existe la RUTA');
    }

    existRuta.name = ruta.name;
    existRuta.description = ruta.description;

    const updateRuta = await this._rutaRepository.save(existRuta);

    return plainToClass(ReadRutaDto, updateRuta);
  }

  async deleteRuta(rutaId: number): Promise<void> {
    if (!rutaId) {
      throw new NotFoundException('Id de la RUTA es requerida');
    }

    const existRuta = await this._rutaRepository.findOne(rutaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existRuta) {
      throw new NotFoundException('No existe la RUTA');
    }

    await this._rutaRepository.update(rutaId, {
      status: Status.INACTIVO,
    });
  }
}
