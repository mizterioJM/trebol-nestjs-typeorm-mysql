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
import { RoleService } from './role.service';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleType } from './role.enum';
import { Roles } from './decorators/role.decorator';
import { RoleGuard } from './guards/role.guard';

@Controller('roles')
@UseGuards(AuthGuard())
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getRole(@Param('roleId', ParseIntPipe) roleId: number): Promise<ReadRoleDto> {
    return this._roleService.get(roleId);
  }

  @Get()
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  getRoles(): Promise<ReadRoleDto[]> {
    return this._roleService.getAll();
  }

  @Post()
  createRole(@Body() role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    return this._roleService.create(role);
  }

  @Patch(':roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  updateRole(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    return this._roleService.update(roleId, role);
  }

  @Delete(':roleId')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  deleteRole(@Param('roleId', ParseIntPipe) roleId: number) {
    return this._roleService.delete(roleId);
  }
}
