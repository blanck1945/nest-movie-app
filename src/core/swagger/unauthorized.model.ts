import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedModel {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({ example: '2023-10-22T06:12:29.878Z' })
  timestamp: string;

  @ApiProperty({ example: true })
  hasError: boolean;

  @ApiProperty({ example: 'Unauthorized' })
  message: string;

  @ApiProperty({ example: ['/movies/11', '/movies/create'] })
  path: string;

  @ApiProperty({ example: 'API error' })
  type: string;
}
