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
import { ReadServicioDto, CreateServicioDto, UpdateServicioDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('servicio')
@UseGuards(AuthGuard())
export class ServicioController {
  constructor(private readonly _servicioService: ServicioService) {}

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

  @Get('fech/:date')
  getServicioFecha(@Param('date') date: string) {
    return this._servicioService.getServicioFecha(date);
  }

  @Post()
  @UseInterceptors(FilesInterceptor('image', 5))
  createServicio(
    @Body() servicio: Partial<CreateServicioDto>,
    @UploadedFiles() files: any,
  ): Promise<ReadServicioDto> {
    return this._servicioService.createServicio(servicio, files);
  }

  @Patch(':servId')
  updateServicio(
    @Param('servId', ParseIntPipe) servId: number,
    @Body() servicio: Partial<UpdateServicioDto>,
  ) {
    return this._servicioService.updateService(servId, servicio);
  }

  @Delete(':servId')
  deleteServicio(@Param('servId', ParseIntPipe) servId: number): Promise<void> {
    return this._servicioService.deleteServicio(servId);
  }
}
