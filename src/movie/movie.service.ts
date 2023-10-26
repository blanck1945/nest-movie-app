import { Injectable } from '@nestjs/common';
import { CoreService } from '../core/core.service';
import { StarWarsApiIndexResponse } from './responses/index.response.dto';
import { MovieBaseDto } from './dto/movie.base.dto';
import { MovieCreateDto } from './dto/movie.create.dto';
import { MovieUpdateDto } from './dto/movie.update.dto';
import mongoose from 'mongoose';
import { SUCCESS_MESSAGES } from '../core/responses/success';
import { NewMovieResponse } from './responses/create.response.dto';
import { DeletedMovieResponse } from './responses/delete.response.dto';

@Injectable()
export class MovieService {
  constructor(private coreService: CoreService) {}

  async index() {
    return await this.coreService.fetch<StarWarsApiIndexResponse>(
      process.env.MOVIE_API_URL,
      {
        successMessage: SUCCESS_MESSAGES('movie', 'index'),
      },
    );
  }

  async show(id: number) {
    return await this.coreService.fetch<MovieBaseDto>(
      `${process.env.MOVIE_API_URL}/${id}`,
      {
        successMessage: SUCCESS_MESSAGES('movie', 'show'),
      },
    );
  }

  async create(body: MovieCreateDto) {
    return await this.coreService.query<NewMovieResponse>(
      () => {
        return {
          id: new mongoose.Types.ObjectId().toHexString(),
          title: body.title,
        };
      },
      {
        successMessage: SUCCESS_MESSAGES('movie', 'create'),
      },
    );
  }

  async update(id: number, body: MovieUpdateDto) {
    const apiResponse = await this.coreService.fetch<MovieBaseDto>(
      `${process.env.MOVIE_API_URL}/${id}`,
    );

    return await this.coreService.query<MovieUpdateDto>(
      () => {
        return {
          id,
          title: apiResponse.data.title,
          updatedFields: body,
        };
      },
      {
        successMessage: SUCCESS_MESSAGES('movie', 'update'),
      },
    );
  }

  async delete(id: number) {
    const apiResponse = await this.coreService.fetch<MovieBaseDto>(
      `${process.env.MOVIE_API_URL}/${id}`,
    );

    return await this.coreService.query<DeletedMovieResponse>(
      () => {
        return {
          id,
          title: apiResponse.data.title,
        };
      },
      {
        successMessage: SUCCESS_MESSAGES('movie', 'delete'),
      },
    );
  }
}
