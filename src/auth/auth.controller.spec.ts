import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserModule } from '../user/user.module';
import { JwtTokenService } from './jwt/jwt.service';
import { SIGNUP_MOCK_BODY } from './test/mocks/signup.mock';
import { LOGIN_MOCK_REGULAR_USER_BODY } from './test/mocks/login.mock';
import { LoginResponse } from 'src/user/responses/login.response';

describe('AuthController', () => {
  let authController: AuthController;
  //let createUserDto: CreateUserDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule,
      ],
      controllers: [AuthController],
      providers: [UserService, JwtTokenService],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    //createUserDto = module.get<CreateUserDto>(CreateUserDto);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('POST - /signup', () => {
    it('should create a new user and return _id, email and username', async () => {
      const mockResponse = jest
        .fn((x) => x)
        .mockImplementation((body) => {
          return {
            hasErrror: false,
            message: 'User created successfully',
            user_id: '5f9d4b0b9d9b4b0017b0e3d0',
            email: body.email,
            username: body.username,
          };
        });

      const mockResult = mockResponse(SIGNUP_MOCK_BODY);
      const result = await authController.signup(SIGNUP_MOCK_BODY);

      expect(result).toHaveProperty('message', 'User created successfully');
      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('data', LoginResponse);

      expect(result.data.username).toEqual(mockResult.username);
      expect(result.data.email).toEqual(mockResult.email);
      expect(result.data.user_id).not.toEqual(mockResult.user_id);
    });
  });

  describe('POST - /login', () => {
    it('should login an existing user and return user data and a jwt token', async () => {
      const result = await authController.login(LOGIN_MOCK_REGULAR_USER_BODY);

      expect(result).toHaveProperty('message', 'User logged in successfully');
      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('data');

      expect(result.data).toHaveProperty('token');
      expect(result.data).toHaveProperty('user');

      expect(result.data.user).toHaveProperty('username');
      expect(result.data.user).toHaveProperty('email');
      expect(result.data.user).toHaveProperty('notifications');
      expect(result.data.user).toHaveProperty('createdAt');
      expect(result.data.user).toHaveProperty('updatedAt');
      expect(result.data.user).toHaveProperty('id');
      expect(result.data.user).toHaveProperty('password');
      expect(result.data.user).toHaveProperty('role');
      expect(result.data.user).toHaveProperty('firstName');
      expect(result.data.user).toHaveProperty('lastName');
      expect(result.data.user).toHaveProperty('notifications');
    });
  });
});
