import { UnauthorizedException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.enum';
import { AuthRepository } from '../repository/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../payload/jwt-payload.interface';
import { Status } from '../../../shared/status.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { nDocument } = payload;

    const user = await this._authRepository.findOne({
      where: { nDocument, status: Status.ACTIVO },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
