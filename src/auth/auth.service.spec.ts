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
      providers: [AuthService, UserService, NotificationService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
