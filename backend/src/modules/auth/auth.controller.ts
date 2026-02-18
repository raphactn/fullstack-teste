import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDTO, RegisterDTO } from './dtos/auth';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDTO) {
    return await this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return await this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user;
  }
}
