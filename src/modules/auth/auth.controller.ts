import {
  Controller,
  Body,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistroDto } from './dto/registro.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/registro')
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
