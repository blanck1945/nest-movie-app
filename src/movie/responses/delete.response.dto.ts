import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ResponseDto } from 'src/core/dto/response.dto';

export class DeletedMovieResponse {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  id: number;
}

export class MovieDeleteResponseDto extends ResponseDto<DeletedMovieResponse> {
  @ApiProperty({
    example: {
      id: 1,
    },
  })
  data: DeletedMovieResponse;
}
