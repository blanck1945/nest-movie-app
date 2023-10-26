import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenService } from './jwt/jwt.service';
import { ResponseService } from '../core/responses/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [AuthController],
  providers: [UserService, JwtTokenService, ResponseService],
})
export class AuthModule {}
