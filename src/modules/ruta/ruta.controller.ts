import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RutaService } from './ruta.service';
import { ReadRutaDto } from './dto/read-ruta.dto';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';

@Controller('ruta')
export class RutaController {
  constructor(private readonly _rutaService: RutaService) {}

  @Get(':rutaId')
  getRuta(@Param('rutaId', ParseIntPipe) rutaId: number): Promise<ReadRutaDto> {
    return this._rutaService.getRuta(rutaId);
  }

  @Get()
  getRutas(): Promise<ReadRutaDto[]> {
    return this._rutaService.getRutas();
  }

  @Post()
  createRuta(@Body() ruta: Partial<CreateRutaDto>): Promise<ReadRutaDto> {
    return this._rutaService.createRuta(ruta);
  }

  @Patch(':rutaId')
  updateRuta(
    @Param('rutaId', ParseIntPipe) rutaId: number,
    @Body() ruta: Partial<UpdateRutaDto>,
  ): Promise<ReadRutaDto> {
    return this._rutaService.updateRuta(rutaId, ruta);
  }

  @Delete(':rutaId')
  deleteRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this._rutaService.deleteRuta(rutaId);
  }
}
