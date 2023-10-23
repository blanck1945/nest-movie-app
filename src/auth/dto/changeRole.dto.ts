import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ChangeRoleDto {
  @ApiProperty({ enum: ['Usuario regular', 'Administrador'] })
  @IsNotEmpty()
  @IsEnum(['Usuario regular', 'Administrador'])
  role: string;
}
