import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ResponseDto } from '../../core/dto/response.dto';

export const SIGNUP_RESPONSE_MOCK = {
  user_id: '6539964dcc818c202f88fa5a',
  username: 'admin.username',
  email: 'admin.email@gmail.com',
};

export class SingupResponse {
  @IsString()
  @IsNotEmpty()
  user_id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}

export class SingupResponseDto extends ResponseDto<SingupResponse> {
  @ApiProperty({
    example: SIGNUP_RESPONSE_MOCK,
  })
  data: SingupResponse;
}
