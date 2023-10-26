import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { ResponseDto } from 'src/core/dto/response.dto';
import { ROLES, RolesTypes } from 'src/core/enums/roles';

export class ChangeRoleResponse {
  @IsNotEmpty()
  @IsString()
  user_id: mongoose.Types.ObjectId;

  @IsNotEmpty()
  @IsEnum([ROLES.admin, ROLES.regularUser])
  newRole: RolesTypes;
}

export class ChangeRoleResponseDto extends ResponseDto<ChangeRoleResponse> {
  data: ChangeRoleResponse;
}
