import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RutaService } from './ruta.service';
import { ReadRutaDto } from './dto/read-ruta.dto';
import { CreateRutaDto } from './dto/create-ruta.dto';
import { UpdateRutaDto } from './dto/update-ruta.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from '../role/role.enum';
import { Roles } from '../role/decorators/role.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('ruta')
@UseGuards(AuthGuard())
export class RutaController {
  constructor(private readonly _rutaService: RutaService) {}

  @Get(':rutaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getRuta(@Param('rutaId', ParseIntPipe) rutaId: number): Promise<ReadRutaDto> {
    return this._rutaService.getRuta(rutaId);
  }

  @Get()
  @Roles(RoleType.ADMIN, RoleType.GENERAL)
  @UseGuards(AuthGuard(), RoleGuard)
  getRutas(): Promise<ReadRutaDto[]> {
    return this._rutaService.getRutas();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  createRuta(@Body() ruta: Partial<CreateRutaDto>): Promise<ReadRutaDto> {
    return this._rutaService.createRuta(ruta);
  }

  @Patch(':rutaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateRuta(
    @Param('rutaId', ParseIntPipe) rutaId: number,
    @Body() ruta: Partial<UpdateRutaDto>,
  ): Promise<ReadRutaDto> {
    return this._rutaService.updateRuta(rutaId, ruta);
  }

  @Delete(':rutaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteRuta(@Param('rutaId', ParseIntPipe) rutaId: number) {
    return this._rutaService.deleteRuta(rutaId);
  }
}
