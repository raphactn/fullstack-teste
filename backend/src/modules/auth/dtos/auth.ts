import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({
    example: 'raphael@email.com',
    description: 'E-mail do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Senha do usuário',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class RegisterDTO {
  @ApiProperty({
    example: 'Raphael Caetano',
    description: 'Nome completo do usuário',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'raphael@email.com',
    description: 'E-mail do usuário',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Senha deve ter pelo menos 6 caracteres',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}

export class UserResponseDTO {
  @ApiProperty({
    example: 'c1f6a6c2-7f6b-4c1a-9c6e-12fdf4f6b111',
  })
  id: string;

  @ApiProperty({
    example: 'Raphael Caetano',
  })
  name: string;

  @ApiProperty({
    example: 'raphael@email.com',
  })
  email: string;
}

export class AuthResponseDTO {
  @ApiProperty({
    type: UserResponseDTO,
  })
  user: UserResponseDTO;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken: string;
}
