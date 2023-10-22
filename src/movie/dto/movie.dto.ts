import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ example: 'A New Hope' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 4 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war.' })
  @IsNotEmpty()
  @IsString()
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsNotEmpty()
  @IsString()
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsNotEmpty()
  @IsString()
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsNotEmpty()
  @IsString()
  release_date: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'] })
  @IsOptional()
  @IsArray()
  characters: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/planets/1/'] })
  @IsOptional()
  @IsArray()
  planets: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/starships/2/'] })
  @IsOptional()
  @IsArray()
  starships: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/4/'] })
  @IsOptional()
  @IsArray()
  vehicles: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'] })
  @IsOptional()
  @IsArray()
  species: string[];
}

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  episode_id: number;

  @IsOptional()
  @IsString()
  opening_crawl: string;

  @IsOptional()
  @IsString()
  director: string;

  @IsOptional()
  @IsString()
  producer: string;

  @IsOptional()
  @IsString()
  release_date: string;

  @IsOptional()
  @IsArray()
  characters: string[];

  @IsOptional()
  @IsArray()
  planets: string[];

  @IsOptional()
  @IsArray()
  starships: string[];

  @IsOptional()
  @IsArray()
  vehicles: string[];

  @IsOptional()
  @IsArray()
  species: string[];

  @IsOptional()
  @IsString()
  url: string;
}
