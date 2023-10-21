import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { CoreService } from '../core/core.service';
import { AppModule } from '../app.module';
import { UserModule } from '../user/user.module';
import { CREATE_MOVIE_BODY, UPDATE_MOVIE_BODY } from './test/mocks/body';
import { SHOW_MOVIE_RESPONSE } from './test/mocks/movie';

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
      providers: [MovieService, UserService, JwtService, CoreService],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
  });

  describe('index method is called', () => {
    it('should return an object', async () => {
      const result = await movieService.index();

      expect(result).toHaveProperty('count');
      expect(result).toHaveProperty('next');
      expect(result).toHaveProperty('previous');
      expect(result).toHaveProperty('results');
    }, 10000);
  });

  describe('show method is called', () => {
    it('should return an object', async () => {
      const mockResponse = jest
        .fn()
        .mockImplementation(() => SHOW_MOVIE_RESPONSE);

      const mockResult = mockResponse();
      const result = await movieService.show(1);

      expect(result).toEqual(mockResult);
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('episode_id');
      expect(result).toHaveProperty('opening_crawl');
      expect(result).toHaveProperty('director');
      expect(result).toHaveProperty('producer');
      expect(result).toHaveProperty('release_date');
      expect(result).toHaveProperty('characters');
      expect(result).toHaveProperty('planets');
      expect(result).toHaveProperty('starships');
      expect(result).toHaveProperty('vehicles');
      expect(result).toHaveProperty('species');
      expect(result).toHaveProperty('created');
      expect(result).toHaveProperty('edited');
      expect(result).toHaveProperty('url');
    });
  });

  describe('create method is called', () => {
    it('should return an object', async () => {
      const mockResponse = jest
        .fn((x) => x)
        .mockImplementation((body) => {
          return {
            message: 'movie created successfully',
            _id: '5f9d4b0b9d9b4b0017b0e3d0',
            title: body.title,
          };
        });

      const mockResult = mockResponse(CREATE_MOVIE_BODY);
      const result = await movieService.create(CREATE_MOVIE_BODY);

      expect(result).toHaveProperty('message', mockResult.message);
      expect(result).toHaveProperty('title', mockResult.title);
      expect(result).toHaveProperty('_id');

      expect(result._id).not.toEqual(mockResult._id);
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

    it("should return an object with the message 'movie updated successfully'", async () => {
      const mockResponse = jest
        .fn((x, y) => x)
        .mockImplementation((id) => {
          return {
            hasError: false,
            message: 'movie updated successfully',
            id,
          };
        });

      const mockResult = mockResponse(1, UPDATE_MOVIE_BODY);
      const result = await movieService.update(1, UPDATE_MOVIE_BODY);

      expect(result).toEqual(mockResult);
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

    it('should return an object with ', async () => {
      const deleteMockFn = jest
        .fn((x) => x)
        .mockImplementation((id) => {
          return {
            hasError: false,
            message: 'movie deleted successfully',
            id,
          };
        });

      const deleteMockResult = deleteMockFn(1);
      const result = await movieService.delete(1);

      expect(result).toEqual(deleteMockResult);
    }, 10000);
  });
});
