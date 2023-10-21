import { CreateMovieDto } from 'src/movie/dto/movie.dto';

export const CREATE_MOVIE_BODY: CreateMovieDto = {
  title: 'The last Jedi',
  episode_id: 8,
  opening_crawl: 'The last Jedi',
  director: 'Rian Johnson',
  producer: 'Kathleen Kennedy, Ram Bergman',
  release_date: '2017-12-15',
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
};

export const UPDATE_MOVIE_BODY = {
  title: 'The last Jedi - updated',
  episode_id: 7,
};
