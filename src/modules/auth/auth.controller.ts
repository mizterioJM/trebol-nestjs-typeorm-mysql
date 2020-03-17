import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../role/decorators/role.decorator';
import { RoleType } from '../role/role.enum';
import { RoleGuard } from '../role/guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/registro')
  @Roles(RoleType.ADMIN)
  @UseGuards(AuthGuard(), RoleGuard)
  @UsePipes(ValidationPipe)
  async registro(@Body() registroDto: RegistroDto): Promise<void> {
    return this._authService.registro(registroDto);
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }
}
