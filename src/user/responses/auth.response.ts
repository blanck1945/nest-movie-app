import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ResponseDto } from '../../core/dto/response.dto';

export class SingupResponse {
  @ApiProperty({ example: '6539964dcc818c202f88fa5a' })
  @IsString()
  @IsNotEmpty()
  user_id: Types.ObjectId;

  @ApiProperty({ example: 'admin.username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'admin.email@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class SingupResponseDto extends ResponseDto<SingupResponse> {
  data: SingupResponse;
}
