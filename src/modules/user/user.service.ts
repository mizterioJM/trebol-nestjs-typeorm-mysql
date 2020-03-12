import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { ReadUserDto } from './dto/read-user.dto';
import { Status } from '../../shared/status.enum';
import { User } from './entity/user.entity';
import { plainToClass } from 'class-transformer';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleRepository } from '../role/repository/role.repository';
import { UserDetails } from './entity/user.details.entity';
import { ReadUserFechaDto } from './dto/read-user-fecha-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async get(userId: number): Promise<ReadUserDto> {
    if (!userId) {
      throw new BadRequestException('Id necesario');
    }

    const user: User = await this._userRepository.findOne(userId, {
      where: { status: Status.ACTIVO },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return plainToClass(ReadUserDto, user);
  }

  async getAllChofer(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: Status.ACTIVO, chofer: true },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async getAllApoyo(): Promise<ReadUserDto[]> {
    const users: User[] = await this._userRepository.find({
      where: { status: Status.ACTIVO, chofer: false },
    });

    return users.map((user: User) => plainToClass(ReadUserDto, user));
  }

  async update(
    userId: number,
    user: Partial<UpdateUserDto>,
  ): Promise<ReadUserDto> {
    const foundUser = await this._userRepository.findOne(userId, {
      where: { status: Status.ACTIVO },
    });

    if (!foundUser) {
      throw new NotFoundException('Usuario NO existe');
    }

    foundUser.nDocument = user.nDocument;
    foundUser.chofer = user.chofer;

    const updateDetails = new UserDetails();

    updateDetails.name = user.details.name;
    updateDetails.lastname = user.details.lastname;
    updateDetails.fechaNac = user.details.fechaNac;

    foundUser.details = updateDetails;

    const updateUser = await this._userRepository.save(foundUser);
    return plainToClass(ReadUserDto, updateUser);
  }

  async delete(userId: number): Promise<void> {
    const userExist = await this._userRepository.findOne(userId, {
      where: { status: Status.ACTIVO },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    await this._userRepository.update(userId, { status: Status.INACTIVO });
  }

  async getDiasTrabajadosChofer(
    fecha_ini: string,
    fecha_fin: string,
  ): Promise<ReadUserFechaDto[]> {
    const trab_dias = await this._userRepository
      .createQueryBuilder('u')
      .select('u.id', 'id')
      .addSelect('d.name', 'nombre')
      .addSelect('d.lastname', 'apellido')
      .addSelect('COUNT(s.chofer_id)', 'dias')
      .innerJoin('servicios', 's', 'u.id = s.chofer_id')
      .innerJoin('users_details', 'd', 'u.detail_id = d.id')
      .where('s.fecha_reg >= :fecha_ini', { fecha_ini })
      .andWhere('s.fecha_reg <= :fecha_fin', { fecha_fin })
      .groupBy('nombre')
      .addGroupBy('apellido')
      .addGroupBy('id')
      .getRawMany()
      .finally();

    return trab_dias.map((dia) => plainToClass(ReadUserFechaDto, dia));
  }

  async getDiasTrabajadosApoyo(
    fecha_ini: string,
    fecha_fin: string,
  ): Promise<ReadUserFechaDto[]> {
    const trab_dias = await this._userRepository
      .createQueryBuilder('u')
      .select('u.id', 'id')
      .addSelect('d.name', 'nombre')
      .addSelect('d.lastname', 'apellido')
      .addSelect('COUNT(s.apoyoA_id)', 'dias')
      .innerJoin('servicios', 's', 'u.id = s.apoyoA_id')
      .innerJoin('users_details', 'd', 'u.detail_id = d.id')
      .where('s.fecha_reg >= :fecha_ini', { fecha_ini })
      .andWhere('s.fecha_reg <= :fecha_fin', { fecha_fin })
      .groupBy('nombre')
      .addGroupBy('apellido')
      .addGroupBy('id')
      .getRawMany()
      .finally();

    return trab_dias.map((dia) => plainToClass(ReadUserFechaDto, dia));
  }

  // async setRoleToUser(userId: number, roleId: number): Promise<boolean> {
  //   const userExist = await this._userRepository.findOne(userId, {
  //     where: { status: Status.ACTIVO },
  //   });

  //   if (!userExist) {
  //     throw new NotFoundException();
  //   }

  //   const roleExist = await this._roleRepository.findOne(roleId, {
  //     where: { status: Status.ACTIVO },
  //   });

  //   if (!roleExist) {
  //     throw new NotFoundException('el rol no existe');
  //   }

  //   userExist.roles.push(roleExist);

  //   return (await this._userRepository.save(userExist)) ? true : false;
  // }
}
