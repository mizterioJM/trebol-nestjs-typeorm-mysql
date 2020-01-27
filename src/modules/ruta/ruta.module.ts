import { Module } from '@nestjs/common';
import { RutaController } from './ruta.controller';
import { RutaService } from './ruta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RutaRepository } from './repository/ruta.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RutaRepository]), AuthModule],
  controllers: [RutaController],
  providers: [RutaService],
})
export class RutaModule {}
