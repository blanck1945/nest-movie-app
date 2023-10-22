'statusCode';
import { ApiProperty } from '@nestjs/swagger';

export class ValildationModel {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: '2023-10-22T06:15:52.308Z' })
  timestamp: string;

  @ApiProperty({ example: true })
  hasError: boolean;

  @ApiProperty({
    example: [
      'Bad Request Exception',
      'Validation failed (numeric string is expected)',
    ],
  })
  message: string;

  @ApiProperty({ example: ['/movies/not-a-number', '/movies/create'] })
  path: string;

  @ApiProperty({ example: 'API error' })
  type: string;
}
