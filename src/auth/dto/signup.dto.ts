import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from '../../users/user.entity';

export class SignupDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsEnum(Role)
  role!: Role;
}