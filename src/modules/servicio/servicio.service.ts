import {
  Injectable,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicioRepository } from './repository/servicio.repository';
import { UserRepository } from '../user/repository/user.repository';
import { JaulaRepository } from '../jaula/repository/jaula.repository';
import { RutaRepository } from '../ruta/repository/ruta.repository';
import { plainToClass } from 'class-transformer';
import { ReadServicioDto, CreateServicioDto, UpdateServicioDto } from './dto';
import { Servicio } from './entity/servicio.entity';
import { Status } from '../../shared/status.enum';
import { DeepPartial } from 'typeorm';

@Injectable()
export class ServicioService {
  constructor(
    @InjectRepository(ServicioRepository)
    private readonly _servicioRepository: ServicioRepository,
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(JaulaRepository)
    private readonly _jaulaRepository: JaulaRepository,
    @InjectRepository(RutaRepository)
    private readonly _rutaRepository: RutaRepository,
  ) {}

  async getServicio(servId: number): Promise<ReadServicioDto> {
    if (!servId) {
      throw new BadRequestException('El ID es requerido');
    }

    const existServicio = await this._servicioRepository.findOne(servId);

    if (!existServicio) {
      throw new NotFoundException('No existe');
    }

    return plainToClass(ReadServicioDto, existServicio);
  }

  async getServicios(): Promise<ReadServicioDto[]> {
    const servicios = await this._servicioRepository.find();

    return servicios.map((servicio: Servicio) =>
      plainToClass(ReadServicioDto, servicio),
    );
  }

  async createServicio(
    servicio: Partial<CreateServicioDto>,
  ): Promise<ReadServicioDto> {
    const createServicio = await this._servicioRepository.save(servicio);

    if (!createServicio) {
      throw new InternalServerErrorException();
    }

    return plainToClass(ReadServicioDto, createServicio);
  }

  async updateService(
    servId: number,
    servicio: Partial<UpdateServicioDto>,
  ): Promise<ReadServicioDto> {
    if (!servId) {
      throw new BadRequestException('Id necesario');
    }

    const existService = await this._servicioRepository.findOne(servId);

    if (!existService) {
      throw new NotFoundException('Servicio no existe');
    }

    existService.ruta = servicio.ruta;
    existService.jaula = servicio.jaula;
    existService.chofer = servicio.chofer;
    existService.apoyoA = servicio.apoyoA;
    existService.apoyoB = servicio.apoyoB;

    const updateServicio = await this._servicioRepository.save(existService);

    if (!updateServicio) {
      throw new InternalServerErrorException();
    }

    return plainToClass(ReadServicioDto, updateServicio);
  }

  async deleteServicio(servId: number): Promise<void> {
    if (!servId) {
      throw new BadRequestException('Id requerido');
    }

    const existServicio = await this._servicioRepository.delete(servId);

    if (!existServicio) {
      throw new NotFoundException('No existe registro del servicio');
    }
  }
}
