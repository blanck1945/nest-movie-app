import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { CreateUserDto } from './dto/user.dt';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AppModule } from '../app.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './decorators/user.decorator';
import { UserSchema } from './schema/user.schema';
import {
  Notification,
  NotificationSchema,
} from '../notification/schema/notification.schema';
import { NotificationService } from '../notification/notification.service';
import { UserModule } from '../user/user.module';

const mockUser = {
  username: 'test2023',
  firstName: 'test',
  lastName: 'pass',
  email: 'test@gmail.com',
  password: 'test123',
};

describe('AuthController', () => {
  let controller: AuthController;
  let createUserDto: CreateUserDto;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        MongooseModule.forFeature([
          { name: User.name, schema: UserSchema },
          { name: Notification.name, schema: NotificationSchema },
        ]),
        JwtModule,
        UserModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, UserService, NotificationService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    createUserDto = module.get<CreateUserDto>(CreateUserDto);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST - /signup', () => {
    it('should be call one time', async () => {
      await controller.signup(mockUser);
      expect(controller.signup).toHaveBeenCalledTimes(1);
    });

    it('should be call with correct params', async () => {
      await controller.signup(mockUser);
      expect(controller.signup).toHaveBeenCalledWith(mockUser);
    });

    it('should successfullly signup user', async () => {
      const result = ['test'];
      jest.spyOn(controller, 'signup').mockImplementation(async () => result);

      expect(await controller.signup(mockUser)).toBe(result);
    });
  });
});
