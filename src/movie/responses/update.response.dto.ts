import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from 'src/core/dto/response.dto';
import { MovieUpdateDto } from '../dto/movie.update.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { MOVIE_RESPONSE_MOCK } from '../test/mocks/movie';

const UPDATED_MOVIE_MOCK = {
  id: '6539964dcc818c202f88fa5a',
  title: 'A New Hope',
  body: MOVIE_RESPONSE_MOCK,
};

export class UpdateModelResponse {
  @IsString()
  @IsNotEmpty()
  id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: MovieUpdateDto;
}

export class MovieUpdatedResponseDto extends ResponseDto<MovieUpdateDto> {
  @ApiProperty({
    example: UPDATED_MOVIE_MOCK,
  })
  data: MovieUpdateDto;
}
