import { Injectable } from '@nestjs/common';
import { CoreService } from '../core/core.service';
import axios from 'axios';
import mongoose from 'mongoose';

@Injectable()
export class MovieService {
  constructor(private coreService: CoreService) {}

  async index() {
    return this.coreService.wrapper(
      async () => await axios.get('http://swapi.dev/api/films'),
    );
  }

  async show(id) {
    return this.coreService.wrapper(
      async () => await axios.get(process.env.MOVIE_API_URL + id),
    );
  }

  async create(body) {
    return await this.coreService.wrapper(
      () => {
        return {
          hasError: false,
          message: 'movie created successfully',
          _id: new mongoose.Types.ObjectId(),
          title: body.title,
        };
      },
      {
        plainResponse: true,
      },
    );
  }

  async update(id, body) {
    return await this.coreService.wrapper(
      async () => {
        await axios.get(process.env.MOVIE_API_URL + id);

        return {
          hasError: false,
          message: 'movie updated successfully',
          id,
          title: body.title,
        };
      },
      {
        plainResponse: true,
      },
    );
  }

  async softDelete(body) {
    try {
      console.warn('body', body);
      //   const result = await axios.get(`${process.env.MOVIE_API_URL}/${id}`);
      //   return result.data;
      return 'movie soft deleted successfully';
    } catch (error) {
      console.log(error);
    }
  }

  async restore(body) {
    try {
      console.warn('body', body);
      return 'movie restored successfully';
      //   const result = await axios.get(`${process.env.MOVIE_API_URL}/${id}`);
      //   return result.data;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    return await this.coreService.wrapper(
      async () => {
        await axios.get(process.env.MOVIE_API_URL + id);

        return {
          hasError: false,
          message: 'movie deleted successfully',
          id,
        };
      },
      {
        plainResponse: true,
      },
    );
  }
}
