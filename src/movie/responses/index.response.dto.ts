import { ResponseDto } from '../../core/dto/response.dto';
import { MovieBaseDto } from '../dto/movie.base.dto';
import { IsArray, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MOVIE_RESPONSE_MOCK } from '../test/mocks/movie';

export class UpdatedMovieResponse {}

export class StarWarsApiIndexResponse {
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  count: number;

  @IsNotEmpty()
  next: number | null;

  @IsNotEmpty()
  previous: number | null;

  @IsNotEmpty()
  @IsArray()
  results: MovieBaseDto[];
}

export class MovieIndexResponseDto extends ResponseDto<StarWarsApiIndexResponse> {
  @ApiProperty({
    example: {
      count: 1,
      next: null,
      previous: null,
      results: [MOVIE_RESPONSE_MOCK],
    },
  })
  data: StarWarsApiIndexResponse;
}

export class MovieShowResponseDto extends ResponseDto<MovieBaseDto> {
  @ApiProperty({
    example: MOVIE_RESPONSE_MOCK,
  })
  data: MovieBaseDto;
}
