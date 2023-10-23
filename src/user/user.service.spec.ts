import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from '../auth/jwt/jwt.service';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../notification/notification.service';
import {
  Notification,
  NotificationSchema,
} from '../notification/schema/notification.schema';
import { SIGNUP_MOCK_BODY } from '../auth/test/mocks/signup.mock';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Notification.name, schema: NotificationSchema },
        ]),
        JwtModule,
      ],
      providers: [
        AuthService,
        UserService,
        JwtTokenService,
        NotificationService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('POST - /signup', () => {
    it('should create a new user and return _id, email and username', async () => {
      const result = await service.create(SIGNUP_MOCK_BODY);

      expect(result).toHaveProperty('message', 'User created successfully');
      expect(result).toHaveProperty('hasError', false);
      expect(result).toHaveProperty('user_id');
      expect(result.username).toEqual('jest.username');
      expect(result.email).toEqual('jest.email@gmail.com');
    });

    it('should fail if email already exists', async () => {
      try {
        await service.create({
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
