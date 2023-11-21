import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { AppController } from './app.controller';
import { AppService } from './appservice';
import { BenefitsController } from './benefits/benefits.controller';
import { CodesController } from './codes/codes.controller';
import { CodesService } from './codes/codes.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017',
        dbName: process.env.MONGO_DB_NAME,
      }),
    }),
    CoreModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [AppController, BenefitsController, CodesController],
  providers: [AppService, CodesService],
})
export class AppModule {}
