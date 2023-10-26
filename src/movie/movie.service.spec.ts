import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CoreService } from '../core/core.service';
import { AppModule } from '../app.module';
import { UserModule } from '../user/user.module';
import { CREATE_MOVIE_BODY, UPDATE_MOVIE_BODY } from './test/mocks/body';
import { MOVIE_RESPONSE_MOCK } from './test/mocks/movie';
import { JwtTokenService } from '../auth/jwt/jwt.service';
import mongoose from 'mongoose';

describe('MovieService', () => {
  let movieService: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      controllers: [MovieController],
      providers: [
        MovieService,
        UserService,
        JwtService,
        CoreService,
        JwtTokenService,
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('index method is called', () => {
    it('should return an array of movies', async () => {
      const result = await movieService.index();

      expect(result).toHaveProperty('hasError');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('data');

      expect(result.data).toHaveProperty('count');
      expect(result.data).toHaveProperty('next');
      expect(result.data).toHaveProperty('previous');
      expect(result.data).toHaveProperty('results');
    }, 10000);
  });

  describe('show method is called', () => {
    it('should return a movie', async () => {
      const mockResponse = jest
        .fn()
        .mockImplementation(() => MOVIE_RESPONSE_MOCK);

      const mockResult = mockResponse();
      const result = await movieService.show(1);

      expect(result).toEqual(mockResult);
      expect(result).toHaveProperty('data');
      expect(result.data).toHaveProperty('title');
      expect(result.data).toHaveProperty('episode_id');
      expect(result.data).toHaveProperty('opening_crawl');
      expect(result.data).toHaveProperty('director');
      expect(result.data).toHaveProperty('producer');
      expect(result.data).toHaveProperty('release_date');
      expect(result.data).toHaveProperty('characters');
      expect(result.data).toHaveProperty('planets');
      expect(result.data).toHaveProperty('starships');
      expect(result.data).toHaveProperty('vehicles');
      expect(result.data).toHaveProperty('species');
      expect(result.data).toHaveProperty('created');
      expect(result.data).toHaveProperty('edited');
      expect(result.data).toHaveProperty('url');
    }, 10000);
  });

  describe('create method is called', () => {
    it('Should return an object indicating that the movie was created successfully', async () => {
      const mockResponse = jest
        .fn((x) => x)
        .mockImplementation((body) => {
          return {
            message: 'movie created successfully',
            _id: '5f9d4b0b9d9b4b0017b0e3d0',
            data: {
              id: new mongoose.Types.ObjectId(),
              title: body.title,
            },
          };
        });

      const mockResult = mockResponse(CREATE_MOVIE_BODY);
      const result = await movieService.create(CREATE_MOVIE_BODY);

      console.warn(result);

      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('message', mockResult.message);
      expect(result.data).toHaveProperty('title', mockResult.title);
      expect(result.data).toHaveProperty('_id');
      expect(result.data.id).not.toEqual(mockResult._id);
    });
  });

  describe('update method is called', () => {
    it("if the movie doesn't exist, should return an Axios error with 404 status code", async () => {
      try {
        await movieService.update(11, UPDATE_MOVIE_BODY);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.cause).toEqual({
          message: 'Record not found',
          type: 'Axios error',
        });
      }
    });

    it('Should return an object indicating that the movie was updated successfully', async () => {
      const mockResponse = jest
        .fn((x, y) => x)
        .mockImplementation((id, body) => {
          return {
            hasError: false,
            message: 'movie updated successfully',
            data: {
              id,
              title: UPDATE_MOVIE_BODY.title,
              updatedFields: body,
            },
          };
        });

      const mockResult = mockResponse(1, UPDATE_MOVIE_BODY);
      const result = await movieService.update(1, UPDATE_MOVIE_BODY);

      expect(result).toEqual(mockResult);
      expect(result).toHaveProperty('message', mockResult.message);
      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('id');
    });
  });

  describe('delete method is called', () => {
    it("if the movie doesn't exist, should return an Axios error with 404 status code", async () => {
      try {
        await movieService.delete(11);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (e) {
        expect(e.status).toBe(404);
        expect(e.cause).toEqual({
          message: 'Record not found',
          type: 'Axios error',
        });
      }
    }, 10000);

    it('Should return an object indicating that the movie was deleted successfully', async () => {
      const deleteMockFn = jest
        .fn((x) => x)
        .mockImplementation((id) => {
          return {
            hasError: false,
            message: 'movie deleted successfully',
            data: {
              id,
            },
          };
        });

      const deleteMockResult = deleteMockFn(1);
      const result = await movieService.delete(1);

      expect(result).toEqual(deleteMockResult);
    }, 10000);
  });
});
