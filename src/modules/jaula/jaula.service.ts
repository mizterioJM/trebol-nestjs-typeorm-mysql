import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JaulaRepository } from './repository/jaula.repository';
import { ReadJaulaDto, CreateJaulaDto, UpdateJaulaDto } from './dto';
import { Status } from '../../shared/status.enum';
import { plainToClass } from 'class-transformer';
import { Jaula } from './entity/jaula.entity';

@Injectable()
export class JaulaService {
  constructor(
    @InjectRepository(JaulaRepository)
    private readonly _jaulaRepository: JaulaRepository,
  ) {}

  async getJaula(jaulaId: number): Promise<ReadJaulaDto> {
    if (!jaulaId) {
      throw new BadRequestException('Id de la jaula requerida');
    }

    const existJaula = await this._jaulaRepository.findOne(jaulaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existJaula) {
      throw new NotFoundException();
    }

    return plainToClass(ReadJaulaDto, existJaula);
  }

  async getJaulas(): Promise<ReadJaulaDto[]> {
    const jaulas = await this._jaulaRepository.find({
      where: { status: Status.ACTIVO },
    });

    return jaulas.map((jaula: Jaula) => plainToClass(ReadJaulaDto, jaula));
  }

  async createJaula(jaula: Partial<CreateJaulaDto>): Promise<ReadJaulaDto> {
    const { code } = jaula;

    if (!code) {
      throw new BadRequestException('Codigo de la jaula requerida');
    }

    const saveJaula = await this._jaulaRepository.save(jaula);

    return plainToClass(ReadJaulaDto, saveJaula);
  }

  async upateJaula(
    jaulaId: number,
    jaula: Partial<UpdateJaulaDto>,
  ): Promise<ReadJaulaDto> {
    const existeJaula = await this._jaulaRepository.findOne(jaulaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existeJaula) {
      throw new NotFoundException('Codigo de Jaula no existe');
    }

    existeJaula.code = jaula.code;
    existeJaula.description = jaula.description;

    const updateJaula = await this._jaulaRepository.save(existeJaula);

    return plainToClass(ReadJaulaDto, updateJaula);
  }

  async deleteJaula(jaulaId: number): Promise<void> {
    const existJaula = await this._jaulaRepository.findOne(jaulaId, {
      where: { status: Status.ACTIVO },
    });

    if (!existJaula) {
      throw new NotFoundException('Codigo Jaula no existe');
    }

    await this._jaulaRepository.update(jaulaId, {
      status: Status.INACTIVO,
    });
  }
}
