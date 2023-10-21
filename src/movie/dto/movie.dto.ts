import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  episode_id: number;

  @IsNotEmpty()
  @IsString()
  opening_crawl: string;

  @IsNotEmpty()
  @IsString()
  director: string;

  @IsNotEmpty()
  @IsString()
  producer: string;

  @IsNotEmpty()
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
