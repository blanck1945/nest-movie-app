import { ApiProperty } from '@nestjs/swagger';

export class DeleteModelResponse {
  @ApiProperty({ example: false })
  hasError: boolean;

  @ApiProperty({ example: 'movie deleted successfully' })
  message: string;

  @ApiProperty({ example: '60f0b6b9e1b9f3b3e8f8e0a0' })
  id: string;
}
