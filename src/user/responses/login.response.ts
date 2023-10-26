import { IsNotEmpty, IsString } from 'class-validator';
import { ResponseDto } from 'src/core/dto/response.dto';
import { User } from '../schema/user.schema';

export class LoginResponse {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class LoginResponseDto extends ResponseDto<LoginResponse> {
  data: LoginResponse;
}
