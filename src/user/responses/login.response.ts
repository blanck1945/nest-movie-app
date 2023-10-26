import { IsNotEmpty, IsString } from 'class-validator';
import { ResponseDto } from 'src/core/dto/response.dto';
import { User } from '../schema/user.schema';
import { ROLES } from 'src/core/enums/roles';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export const LOGIN_RESPONSE_MOCK: LoginResponse = {
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  user: {
    id: new mongoose.Types.ObjectId(),
    username: 'test123',
    email: 'test.email@gmail.com',
    role: ROLES.regularUser,
    firstName: 'test',
    lastName: 'test',
    password: 'test123',
  },
};

export class LoginResponse {
  @IsNotEmpty()
  user: User;

  @IsNotEmpty()
  @IsString()
  token: string;
}

export class LoginResponseDto extends ResponseDto<LoginResponse> {
  @ApiProperty({
    example: LOGIN_RESPONSE_MOCK,
  })
  data: LoginResponse;
}
