import { ApiProperty } from '@nestjs/swagger';

export class MovieReturnModel {
  @ApiProperty({ example: 'A New Hope' })
  title: string;

  @ApiProperty({ example: 4 })
  episode_id: number;

  @ApiProperty({ example: 'It is a period of civil war.' })
  opening_crawl: string;

  @ApiProperty({ example: 'George Lucas' })
  director: string;

  @ApiProperty({ example: 'Gary Kurtz, Rick McCallum' })
  producer: string;

  @ApiProperty({ example: '1977-05-25' })
  release_date: string;

  @ApiProperty({ example: ['https://swapi.dev/api/people/1/'] })
  characters: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/planets/1/'] })
  planets: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/starships/2/'] })
  starships: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/vehicles/4/'] })
  vehicles: string[];

  @ApiProperty({ example: ['https://swapi.dev/api/species/1/'] })
  species: string[];

  @ApiProperty({ example: '2014-12-10T14:23:31.880000Z' })
  created: string;

  @ApiProperty({ example: '2014-12-20T19:49:45.256000Z' })
  edited: string;

  @ApiProperty({ example: 'https://swapi.dev/api/films/1/' })
  url: string;
}
