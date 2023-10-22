import { ApiProperty } from '@nestjs/swagger';

export class NotFoundModel {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({ example: '2023-10-22T06:06:49.437Z' })
  timestamp: string;

  @ApiProperty({ example: true })
  hasError: boolean;

  @ApiProperty({ example: 'Record not found' })
  message: string;

  @ApiProperty({ example: '/movies/11' })
  path: string;

  @ApiProperty({ example: 'Axios error' })
  type: string;
}
