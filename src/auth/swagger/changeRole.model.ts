import { ApiProperty } from '@nestjs/swagger';

export class ChangeRoleModelResponse {
  @ApiProperty({ example: false })
  hasError: boolean;
  @ApiProperty({ example: 'User role changed successfully' })
  message: string;
  @ApiProperty({ example: '6535eaf0c99a806c87dbad5e' })
  user_id: string;
  @ApiProperty({ example: 'Administrador' })
  newRole: string;
}
