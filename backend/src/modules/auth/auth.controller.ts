import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import {
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiCreatedResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import {
  AuthResponseDTO,
  LoginDTO,
  RegisterDTO,
  UserResponseDTO,
} from './dtos/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Criar uma nova conta' })
  @ApiCreatedResponse({
    description: 'Usuário criado com sucesso',
    type: UserResponseDTO,
  })
  @ApiConflictResponse({
    description: 'Email já está em uso',
  })
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiOkResponse({
    description: 'Login realizado com sucesso',
    type: AuthResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Credenciais inválidas',
  })
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Retorna o usuário autenticado' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Usuário autenticado',
    type: UserResponseDTO,
  })
  @ApiUnauthorizedResponse({
    description: 'Token inválido ou expirado',
  })
  async me(@Request() req) {
    return req.user;
  }
}
