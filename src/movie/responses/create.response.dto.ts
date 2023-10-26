import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { ResponseDto } from 'src/core/dto/response.dto';

const CREATED_MOVIE_MOCK = {
  id: '6539964dcc818c202f88fa5a',
  title: 'A New Hope',
};

export class NewMovieResponse {
  @IsString()
  @IsNotEmpty()
  id: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;
}

export class MovieCreateResponseDto extends ResponseDto<NewMovieResponse> {
  @ApiProperty({
    example: CREATED_MOVIE_MOCK,
  })
  data: NewMovieResponse;
}
