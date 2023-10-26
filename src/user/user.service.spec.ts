import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from '../auth/jwt/jwt.service';
import { SIGNUP_MOCK_BODY } from '../auth/test/mocks/signup.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule,
      ],
      providers: [UserService, JwtTokenService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('POST - /login', () => {
    it('login should fail if no user is found - Error message should send Invalid credentials', async () => {
      try {
        await service.login({
          username: 'usuario no existente',
          password: 'test123',
        });
      } catch (error) {
        expect(error.message).toEqual('Invalid credentials');
      }
    });

    it('login should fail if password dont match - Error message should send Invalid credentials', async () => {
      try {
        await service.login({
          username: 'test.user',
          password: 'contraseña incorrecta',
        });
      } catch (error) {
        expect(error.message).toEqual('Invalid credentials');
      }
    });
  });

  describe('POST - /signup', () => {
    it('should create a new user and return _id, email and username', async () => {
      const result = await service.singup(SIGNUP_MOCK_BODY);

      expect(result).toHaveProperty('message', 'User created successfully');
      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('data');
      expect(result.data.username).toEqual('jest.username');
      expect(result.data.email).toEqual('jest.email@gmail.com');
    });

    it('should fail if email already exists', async () => {
      try {
        await service.singup({
          firstName: 'test.fisrtName',
          lastName: 'test.lastName',
          username: 'test.username',
          email: 'test.email@gmail.com',
          password: 'test.password',
        });

        // This line should not be executed
        expect(true).toEqual(false);
      } catch (error) {
        expect(error.message).toEqual('Email already exists');
      }
    });
  });
});
