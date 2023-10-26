import { IsOptional } from 'class-validator';
import { MovieBaseDto } from './movie.base.dto';

export class MovieCreateDto extends MovieBaseDto {
  @IsOptional()
  public characters: string[];

  @IsOptional()
  public planets: string[];

  @IsOptional()
  public starships: string[];

  @IsOptional()
  public vehicles: string[];

  @IsOptional()
  public species: string[];
}
