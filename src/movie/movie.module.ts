import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.schema';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CoreService } from '../core/core.service';
import { JwtTokenService } from 'src/auth/jwt/jwt.service';
import { ResponseService } from 'src/core/responses/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    UserModule,
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    UserService,
    CoreService,
    JwtTokenService,
    ResponseService,
  ],
})
export class MovieModule {}
