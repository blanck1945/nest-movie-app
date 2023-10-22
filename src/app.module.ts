import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { NotificationModule } from './notification/notification.module';
import { InfoModule } from './info/info.module';
import { AppController } from './app/app.controller';

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
    NotificationModule,
    InfoModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
