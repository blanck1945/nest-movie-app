import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './user.service';
import { JwtTokenService } from 'src/auth/jwt/jwt.service';
import { ResponseService } from 'src/core/responses/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
  ],
  controllers: [],
  providers: [UserService, JwtTokenService, ResponseService],
})
export class UserModule {}
