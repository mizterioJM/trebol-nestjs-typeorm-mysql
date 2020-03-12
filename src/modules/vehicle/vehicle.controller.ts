import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ReadVehicleDto, CreateVehicleDto, UpdateVehicleDto } from './dto';

@Controller('vehicle')
export class VehicleController {
  constructor(private readonly _vehicleService: VehicleService) {}

  @Get(':vehicleId')
  getVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.getVehicle(vehicleId);
  }

  @Get()
  getVehicles(): Promise<ReadVehicleDto[]> {
    return this._vehicleService.getVehicles();
  }

  @Post()
  createVehicle(
    @Body() vehicle: Partial<CreateVehicleDto>,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.createVehicle(vehicle);
  }

  @Patch(':vehicleId')
  updateVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() vehicle: Partial<UpdateVehicleDto>,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.updateVehicle(vehicleId, vehicle);
  }

  @Delete(':vehicleId')
  deleteVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<void> {
    return this._vehicleService.deleteVehicle(vehicleId);
  }
}
