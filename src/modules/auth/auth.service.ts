import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { AuthRepository } from './repository/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegistroDto, LoginDto } from './dto';
import { User } from '../user/entity/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from './payload/jwt-payload.interface';
import { RoleType } from '../role/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async registro(registroDto: RegistroDto): Promise<void> {
    const { nDocument } = registroDto;

    const userExist = await this._authRepository.findOne({
      where: { nDocument },
    });

    if (userExist) {
      throw new ConflictException('El Documento ya existe');
    }

    return this._authRepository.register(registroDto);
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { nDocument, password } = loginDto;

    const user: User = await this._authRepository.findOne({
      where: { nDocument },
    });

    const roleId = user.roles.map((role) => {
      return role.id;
    });

    if (!(roleId[0] === 1) && !(user.chofer == true)) {
      throw new NotFoundException('No tienes los Credenciales para Ingresar');
    }

    const isMatch = await compare(password, user.password);

    if (!user || !isMatch) {
      throw new NotFoundException('Credenciales Invalidos');
    }

    const payload: IJwtPayload = {
      id: user.id,
      nDocument: user.nDocument,
      roles: user.roles.map((r) => r.name as RoleType),
    };

    const token = await this._jwtService.sign(payload);

    return { token };
  }
}
