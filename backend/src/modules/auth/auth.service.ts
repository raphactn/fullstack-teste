import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { LoginDTO, RegisterDTO } from './dtos/auth';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: RegisterDTO) {
    const { email, name, password } = data;

    const userExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new ConflictException('Email já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...result } = user;
    return result;
  }

  async login(data: LoginDTO) {
    const { email, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const accessToken = await this.jwtService.signAsync({
      id: user.id,
      email: user.email,
      name: user.name,
    });

    const { password: _, ...safeUser } = user;
    return {
      user: safeUser,
      accessToken,
    };
  }
}
