import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class SwitchUserRole {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsEnum(['Usuario Regular', 'Administrador'])
  readonly role: 'Usuario Regular' | 'Administrador';
}
