import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ROLES, RolesTypes } from 'src/core/enums/roles';

export class ChangeRoleDto {
  @ApiProperty({ enum: [ROLES.admin, ROLES.regularUser] })
  @IsNotEmpty()
  @IsEnum([ROLES.admin, ROLES.regularUser])
  role: RolesTypes;
}
