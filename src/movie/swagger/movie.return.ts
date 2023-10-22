import { ApiProperty } from '@nestjs/swagger';

export class MovieReturnModel {
  @ApiProperty({ example: false })
  hasError: boolean;

  @ApiProperty({ example: 'movie created successfully' })
  message: string;

  @ApiProperty({ example: '5f9d4b0b9d9b4b0017b0e3d0' })
  _id: string;

  @ApiProperty({ example: 'The Shawshank Redemption' })
  title: string;
}
