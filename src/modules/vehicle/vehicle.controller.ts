import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { ReadVehicleDto, CreateVehicleDto, UpdateVehicleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/role.enum';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('vehicle')
@UseGuards(AuthGuard())
export class VehicleController {
  constructor(private readonly _vehicleService: VehicleService) {}

  @Get(':vehicleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.getVehicle(vehicleId);
  }

  @Get()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getVehicles(): Promise<ReadVehicleDto[]> {
    return this._vehicleService.getVehicles();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  createVehicle(
    @Body() vehicle: Partial<CreateVehicleDto>,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.createVehicle(vehicle);
  }

  @Patch(':vehicleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
    @Body() vehicle: Partial<UpdateVehicleDto>,
  ): Promise<ReadVehicleDto> {
    return this._vehicleService.updateVehicle(vehicleId, vehicle);
  }

  @Delete(':vehicleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteVehicle(
    @Param('vehicleId', ParseIntPipe) vehicleId: number,
  ): Promise<void> {
    return this._vehicleService.deleteVehicle(vehicleId);
  }
}
