import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @IsNotEmpty()
  @IsEnum(['Usuario regular', 'Administrador'])
  role: string;
}
