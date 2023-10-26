import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ResponseDto<T> {
  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  hasError: boolean;

  @ApiProperty({ example: 'Success' })
  @IsNotEmpty()
  @IsString()
  message: string;

  @IsOptional()
  data: T;
}
