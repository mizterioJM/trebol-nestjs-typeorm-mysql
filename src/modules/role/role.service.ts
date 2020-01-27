import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './repository/role.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ReadRoleDto, CreateRoleDto, UpdateRoleDto } from './dto';
import { Role } from './entity/role.entity';
import { Status } from '../../shared/status.enum';
import { plainToClass } from 'class-transformer';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(roleId: number): Promise<ReadRoleDto> {
    if (!roleId) {
      throw new BadRequestException('Id necesario');
    }

    const role: Role = await this._roleRepository.findOne(roleId, {
      where: { status: Status.ACTIVO },
    });

    if (!role) {
      throw new NotFoundException();
    }

    return plainToClass(ReadRoleDto, role);
  }

  async getAll(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: Status.ACTIVO },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  async create(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const saveRole: Role = await this._roleRepository.save(role);
    return plainToClass(ReadRoleDto, saveRole);
  }

  async update(
    roleId: number,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const foundRole: Role = await this._roleRepository.findOne(roleId, {
      where: { status: Status.ACTIVO },
    });

    if (!foundRole) {
      throw new NotFoundException('No existe');
    }

    foundRole.name = role.name;
    foundRole.description = role.description;

    const updateRole: Role = await this._roleRepository.save(foundRole);

    return plainToClass(ReadRoleDto, updateRole);
  }

  async delete(roleId: number): Promise<void> {
    const roleExist: Role = await this._roleRepository.findOne(roleId, {
      where: { status: Status.ACTIVO },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    await this._roleRepository.update(roleId, {
      status: Status.INACTIVO,
    });
  }
}
