import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
