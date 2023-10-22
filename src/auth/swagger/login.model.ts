import { ApiProperty } from '@nestjs/swagger';
import { User } from '../schema/user.schema';

export class LoginModelResponse {
  @ApiProperty({ example: false })
  hasError: boolean;

  @ApiProperty({ example: 'User created successfully' })
  message: string;

  @ApiProperty({
    example: {
      notifications: [],
      _id: '653296d3176e81eebf363dd8',
      email: '',
      role: 'admin',
      firstName: 'app',
      lastName: 'admin',
      username: 'admin.main',
      created_at: '2023-10-20T15:02:34.407Z',
      __v: 0,
    },
  })
  user: User;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' })
  token: string;
}
