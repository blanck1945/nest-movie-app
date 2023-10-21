import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../auth/schema/user.schema';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { CoreService } from '../core/core.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule,
    UserModule,
  ],
  controllers: [MovieController],
  providers: [MovieService, UserService, CoreService],
})
export class MovieModule {}
