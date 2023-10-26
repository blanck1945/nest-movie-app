import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ResponseDto } from '../dto/response.dto';

export const ExeptionType = {
  API: 'API error',
  DB: 'DB error',
  AUTH: 'AUTH error',
  VALIDATION: 'VALIDATION error',
  AXIOS: 'AXIOS error',
} as const;

export class ExeptionDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public statusCode: number;

  @IsNotEmpty()
  @IsEnum(ExeptionType)
  public type: typeof ExeptionType;

  @IsNotEmpty()
  @IsString()
  public timestamp: string;

  @IsNotEmpty()
  @IsString()
  public path: string;
}

export class ExeptionResponseDto extends ResponseDto<ExeptionDto> {
  data: ExeptionDto;
}
