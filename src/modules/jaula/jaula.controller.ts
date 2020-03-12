import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { JaulaService } from './jaula.service';
import { ReadJaulaDto, CreateJaulaDto, UpdateJaulaDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/role.enum';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('jaula')
@UseGuards(AuthGuard())
export class JaulaController {
  constructor(private readonly _jaulaService: JaulaService) {}

  @Get(':jaulaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getJaula(@Param('jaulaId', ParseIntPipe) jaulaId: number): Promise<ReadJaulaDto> {
    return this._jaulaService.getJaula(jaulaId);
  }

  @Get()
  getJaulas(): Promise<ReadJaulaDto[]> {
    return this._jaulaService.getJaulas();
  }

  @Post()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  createJaula(@Body() jaula: Partial<CreateJaulaDto>): Promise<ReadJaulaDto> {
    return this._jaulaService.createJaula(jaula);
  }

  @Patch(':jaulaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateJaula(
    @Param('jaulaId', ParseIntPipe) jaulaId: number,
    @Body() jaula: Partial<UpdateJaulaDto>,
  ): Promise<ReadJaulaDto> {
    return this._jaulaService.upateJaula(jaulaId, jaula);
  }

  @Delete(':jaulaId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteJaula(@Param('jaulaId', ParseIntPipe) jaulaId: number): Promise<void> {
    return this._jaulaService.deleteJaula(jaulaId);
  }
}
