import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieUpdateDto {
  @IsOptional()
  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  title?: string;

  @IsOptional()
  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsPositive()
  episode_id?: number;

  @IsOptional()
  @ApiProperty({
    example:
      'It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire.',
  })
  @IsString()
  opening_crawl?: string;

  @IsOptional()
  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  director?: string;

  @IsOptional()
  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  producer?: string;

  @IsOptional()
  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  release_date?: string;

  @IsOptional()
  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'] })
  @IsArray()
  characters?: string[];

  @IsOptional()
  @ApiProperty({ example: ['https://swapi.dev/api/planets/1/'] })
  @IsArray()
  planets?: string[];

  @IsOptional()
  @ApiProperty({ example: ['https://swapi.dev/api/starships/2/'] })
  @IsArray()
  starships?: string[];

  @IsOptional()
  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/4/'] })
  @IsArray()
  vehicles?: string[];

  @IsOptional()
  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'] })
  @IsArray()
  species?: string[];

  @IsOptional()
  @ApiProperty({ example: '2014-12-10T14:23:31.880000Z' })
  @IsString()
  url?: string;
}
