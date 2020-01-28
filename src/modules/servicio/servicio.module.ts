import { Module } from '@nestjs/common';
import { ServicioController } from './servicio.controller';
import { ServicioService } from './servicio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicioRepository } from './repository/servicio.repository';
import { AuthModule } from '../auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { ConfigModule } from '../../config/config.module';
import { ServicioGaleryRepository } from './repository/servicio-galey.repository';
import {
  imageFileFilter,
  editFileName,
} from '../../shared/utilities/murder-file';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServicioRepository, ServicioGaleryRepository]),
    AuthModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        fileFilter: imageFileFilter,
        storage: diskStorage({
          destination: path.join(__dirname + '/upload'),
          filename: editFileName,
        }),
      }),
    }),
    ConfigModule,
  ],
  controllers: [ServicioController],
  providers: [ServicioService],
})
export class ServicioModule {}
