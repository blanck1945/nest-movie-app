import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsPositive, IsString } from 'class-validator';

export class MovieBaseDto {
  @ApiProperty({ example: 'A New Hope' })
  @IsString()
  public title: string;

  @ApiProperty({ example: 4 })
  @IsNumber()
  @IsPositive()
  public episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war.' })
  @IsString()
  public opening_crawl: string;

  @ApiProperty({ example: 'George Lucas' })
  @IsString()
  public director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  @IsString()
  public producer: string;

  @ApiProperty({ example: '1977-05-25' })
  @IsString()
  public release_date: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'] })
  @IsArray()
  public characters: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/planets/1/'] })
  @IsArray()
  public planets: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/starships/2/'] })
  @IsArray()
  public starships: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/4/'] })
  @IsArray()
  public vehicles: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'] })
  @IsArray()
  public species: string[];
}
