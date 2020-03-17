import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Body,
  Delete,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ReadUserDto } from './dto/read-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/role.enum';
import { RoleGuard } from '../role/guards/role.guard';
import { ReadUserFechaDto } from './dto/read-user-fecha-dto';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':userId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getUser(@Param('userId', ParseIntPipe) userId: number): Promise<ReadUserDto> {
    return this._userService.get(userId);
  }

  @Get('/filtro/chofer')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getallChofer(): Promise<ReadUserDto[]> {
    return this._userService.getAllChofer();
  }

  @Get('/filtro/apoyo')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getallApoyo(): Promise<ReadUserDto[]> {
    return this._userService.getAllApoyo();
  }

  @Patch(':userId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() user: Partial<UpdateUserDto>,
  ) {
    return this._userService.update(userId, user);
  }

  @Delete(':userId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteUser(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return this._userService.delete(userId);
  }

  @Get('/chofer/fecha/:f_ini/:f_fin')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getDiasTrabajoChofer(
    @Param('f_ini') f_ini: string,
    @Param('f_fin') f_fin: string,
  ): Promise<ReadUserFechaDto[]> {
    return this._userService.getDiasTrabajadosChofer(f_ini, f_fin);
  }

  @Get('/apoyo/fecha/:f_ini/:f_fin')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getDiasTrabajoApoyo(
    @Param('f_ini') f_ini: string,
    @Param('f_fin') f_fin: string,
  ): Promise<ReadUserFechaDto[]> {
    return this._userService.getDiasTrabajadosApoyo(f_ini, f_fin);
  }

  // @Post('agregarRol/:userId/:roleId')
  // setRoleToUser(
  //   @Param('userId', ParseIntPipe) userId: number,
  //   @Param('roleId', ParseIntPipe) roleId: number,
  // ): Promise<boolean> {
  //   return this._userService.setRoleToUser(userId, roleId);
  // }
}
