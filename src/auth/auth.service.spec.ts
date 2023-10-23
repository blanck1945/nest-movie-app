import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import {
  Notification,
  NotificationSchema,
} from '../notification/schema/notification.schema';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { NotificationService } from '../notification/notification.service';
import { JwtTokenService } from './jwt/jwt.service';

describe('AuthService', () => {
  let service: AuthService;

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
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        NotificationService,
        JwtTokenService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
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
});
