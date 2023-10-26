import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { UserService } from '../user/user.service';
import { CoreService } from '../core/core.service';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserModule } from '../user/user.module';
import { ExecutionContext } from '@nestjs/common';
import { AppModule } from '../app.module';
import { CREATE_MOVIE_BODY } from './test/mocks/body';
import { JwtTokenService } from '../auth/jwt/jwt.service';
import { RoleGuard } from '../auth/guards/role.guard';

const mockTokens = {
  regularUserToken: process.env.REGULAR_USER_TOKEN,
  adminUserToken: process.env.ADMIN_USER_TOKEN,
};

describe('MovieController', () => {
  const getMockContext = (userRole: string) => {
    const token = `Bearer ${mockTokens[userRole]}`;
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            connection: 'keep-alive',
            'sec-ch-ua':
              '"Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"',
            accept: 'application/json, text/plain, */*',
            'content-type': 'application/json',
            'sec-ch-ua-mobile': '?0',
            authorization: token,
          },
        }),
      }),
    } as unknown as ExecutionContext;
  };

  let movieController: MovieController;
  let service: MovieService;

  // Guards
  const AdminGuard = RoleGuard('admin');
  const UserGuard = RoleGuard('regularUser');

  let jwtService;
  let userService;

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

    movieController = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(movieController).toBeDefined();
  });

  describe('/movies', () => {
    it('when movies endpoint is called by ', async () => {
      const spy = jest.spyOn(service, 'index');
      await movieController.index();
      expect(spy).toHaveBeenCalled();
    }, 20000);
  });

  describe('SHOW - /movies/:id', () => {
    it('when show endpoint is called by a "Usuario Regular" the call should succeed', async () => {
      const context = getMockContext('regularUserToken');

      const result = await new UserGuard(jwtService, userService).canActivate(
        context,
      );

      expect(result).toBe(true);
    });

    it('when show endpoint is called by a "Administrador" the call should fail', async () => {
      const context = getMockContext('adminUserToken');

      try {
        await await new UserGuard(jwtService, userService).canActivate(context);

        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(401);
        expect(error.response).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }
    });
  });

  describe('CREATE - /movies/create', () => {
    it('when show endpoint is called by a "Usuario Regular" the call should fail', async () => {
      const context = getMockContext('regularUserToken');

      try {
        await new AdminGuard(jwtService, userService).canActivate(context);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (error) {
        console.log(error);
        expect(error.status).toBe(401);
        expect(error.response).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }
    });

    it('when show endpoint is called by a "Administrador" the call should succeed', async () => {
      const context = getMockContext('adminUserToken');

      const error = await new AdminGuard(jwtService, userService).canActivate(
        context,
      );

      expect(error).toBe(true);
    });

    it('Request body should be valid - type CreateMovieDto', async () => {
      const context = getMockContext('adminUserToken');
      await new AdminGuard(jwtService, userService).canActivate(context);
      const response = await movieController.create(CREATE_MOVIE_BODY);

      expect(response).toHaveProperty('hasError', false);
    });
  });

  describe('UPDATE - /movies/:id', () => {
    it('when show endpoint is called by a "Usuario Regular" the call should fail', async () => {
      const context = getMockContext('regularUserToken');

      try {
        await new AdminGuard(jwtService, userService).canActivate(context);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(401);
        expect(error.response).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }
    });

    it('when show endpoint is called by a "Administrador" the call should succeed', async () => {
      const context = getMockContext('adminUserToken');

      const error = await new AdminGuard(jwtService, userService).canActivate(
        context,
      );

      expect(error).toBe(true);
    });
  });

  describe('DELETE - /movies/:id', () => {
    it('when delete endpoint is called by a "Usuario Regular" the call should fail', async () => {
      const context = getMockContext('regularUserToken');

      try {
        await new AdminGuard(jwtService, userService).canActivate(context);
        // Fail test if above expression doesn't throw anything.
        expect(true).toBe(false);
      } catch (error) {
        expect(error.status).toBe(401);
        expect(error.response).toEqual({
          message: 'Unauthorized',
          statusCode: 401,
        });
      }
    });

    it('when delete endpoint is called by a "Administrador" the call should succeed', async () => {
      const context = getMockContext('adminUserToken');

      const error = await new AdminGuard(jwtService, userService).canActivate(
        context,
      );

      expect(error).toBe(true);
    });
  });
});
