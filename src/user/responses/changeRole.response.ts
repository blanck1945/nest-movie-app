import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ResponseDto } from 'src/core/dto/response.dto';
import { ROLES, RolesTypes } from 'src/core/enums/roles';

export const CHANGE_ROLE_RESPONSE_MOCK = {
  user_id: '6539964dcc818c202f88fa5a',
  newRole: ROLES.admin,
};

export class ChangeRoleResponse {
  @IsNotEmpty()
  @IsString()
  user_id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsEnum([ROLES.admin, ROLES.regularUser])
  newRole: RolesTypes;
}

export class ChangeRoleResponseDto extends ResponseDto<ChangeRoleResponse> {
  @ApiProperty({
    example: CHANGE_ROLE_RESPONSE_MOCK,
  })
  data: ChangeRoleResponse;
}
