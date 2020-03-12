import { Module } from '@nestjs/common';
import { VehicleController } from './vehicle.controller';
import { VehicleService } from './vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from './repository/vehicle.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleRepository]), AuthModule],
  controllers: [VehicleController],
  providers: [VehicleService],
})
export class VehicleModule {}
