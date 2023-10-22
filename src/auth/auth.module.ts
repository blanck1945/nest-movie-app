import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema/user.schema';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import {
  Notification,
  NotificationSchema,
} from '../notification/schema/notification.schema';
import { NotificationService } from '../notification/notification.service';
import { JwtTokenService } from './jwt/jwt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Notification.name, schema: NotificationSchema },
    ]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, NotificationService, JwtTokenService],
})
export class AuthModule {}
