import { ApiProperty } from '@nestjs/swagger';

export class SignupModelResponse {
  @ApiProperty({ example: false })
  hasError: boolean;

  @ApiProperty({ example: 'User created successfully' })
  message: string;

  @ApiProperty({ example: '60f0b6b9e1b9f3b3e8f8e0a0' })
  user_id: string;

  @ApiProperty({ example: 'example@gmail.com' })
  email: string;

  @ApiProperty({ example: 'example123' })
  username: string;
}
