import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Delete,
  UseGuards,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ServicioService } from './servicio.service';
import {
  ReadServicioDto,
  CreateServicioDto,
  UpdateServicioDto,
  CreateServicioImgDto,
} from './dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '../../config/config.service';
import { Configuration } from '../../config/config.enum';

// tslint:disable-next-line: no-var-requires
const Cloudinary = require('cloudinary');

@Controller('servicio')
@UseGuards(AuthGuard())
export class ServicioController {
  images_details: CreateServicioImgDto[] = [];
  constructor(
    private readonly _servicioService: ServicioService,
    private readonly _configService: ConfigService,
  ) {}

  @Get(':servId')
  getServicio(
    @Param('servId', ParseIntPipe) servId: number,
  ): Promise<ReadServicioDto> {
    return this._servicioService.getServicio(servId);
  }

  @Get()
  getServicios(): Promise<ReadServicioDto[]> {
    return this._servicioService.getServicios();
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 5))
  async createServicio(
    @Body() servicio: Partial<CreateServicioDto>,
    @UploadedFiles() files,
  ): Promise<ReadServicioDto> {
    console.log(servicio);
    const paths = await this.cloudinaryConfig(files);
    if (!paths) {
      return;
    }
  }

  @Patch(':servId')
  updateServicio(
    @Param('servId', ParseIntPipe) servId: number,
    servicio: Partial<UpdateServicioDto>,
  ): Promise<ReadServicioDto> {
    return this._servicioService.updateService(servId, servicio);
  }

  @Delete(':servId')
  deleteServicio(@Param('servId', ParseIntPipe) servId: number): Promise<void> {
    return this._servicioService.deleteServicio(servId);
  }

  async cloudinaryConfig(files: any): Promise<any[]> {
    const pathImages = await files.map(file => file.path);

    if (!pathImages) {
      return;
    }

    Cloudinary.config({
      cloud_name: this._configService.get(Configuration.CLOUD_NAME),
      api_key: this._configService.get(Configuration.CLOUD_API_KEY),
      api_secret: this._configService.get(Configuration.CLOUD_API_SECRET),
    });

    return pathImages;
  }
}
