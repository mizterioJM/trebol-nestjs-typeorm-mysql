import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VehicleRepository } from './repository/vehicle.repository';
import { ReadVehicleDto, CreateVehicleDto, UpdateVehicleDto } from './dto';
import { Status } from '../../shared/status.enum';
import { plainToClass } from 'class-transformer';
import { Vehicle } from './entity/vehicle.entity';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleRepository)
    private readonly _vehicleRepository: VehicleRepository,
  ) {}

  async getVehicle(vehicleId: number): Promise<ReadVehicleDto> {
    if (!vehicleId) {
      throw new BadRequestException();
    }

    const existVehicle = await this._vehicleRepository.findOne(vehicleId, {
      where: { status: Status.ACTIVO },
    });

    if (!existVehicle) {
      throw new NotFoundException();
    }

    return plainToClass(ReadVehicleDto, existVehicle);
  }

  async getVehicles(): Promise<ReadVehicleDto[]> {
    const vehicles = await this._vehicleRepository.find({
      where: { status: Status.ACTIVO },
    });

    return vehicles.map((vehicle: Vehicle) => plainToClass(ReadVehicleDto, vehicle));
  }

  async createVehicle(vehicle: Partial<CreateVehicleDto>): Promise<ReadVehicleDto> {
    const { placa } = vehicle;

    if (!placa) {
      throw new BadRequestException('Placa quererida');
    }

    const saveVehicle = await this._vehicleRepository.save(vehicle);

    return plainToClass(ReadVehicleDto, saveVehicle);
  }

  async updateVehicle(
    vehicleId: number,
    vehicle: Partial<UpdateVehicleDto>,
  ): Promise<ReadVehicleDto> {
    if (!vehicleId) {
      throw new BadRequestException();
    }

    const existVehicle = await this._vehicleRepository.findOne(vehicleId, {
      where: { status: Status.ACTIVO },
    });

    if (!existVehicle) {
      throw new NotFoundException();
    }

    existVehicle.placa = vehicle.placa;
    existVehicle.description = vehicle.description;

    const updateVehicle = await this._vehicleRepository.save(existVehicle);

    return plainToClass(ReadVehicleDto, updateVehicle);
  }

  async deleteVehicle(vehicleId: number): Promise<void> {
    if (!vehicleId) {
      throw new BadRequestException();
    }

    const existVehicle = await this._vehicleRepository.findOne(vehicleId, {
      where: { status: Status.ACTIVO },
    });

    if (!existVehicle) {
      throw new BadRequestException('Vehiculo no existe');
    }

    await this._vehicleRepository.update(vehicleId, {
      status: Status.INACTIVO,
    });
  }
}
