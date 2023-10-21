import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/custom.exeption';

@Module({
  imports: [],
  controllers: [CoreController],
  providers: [
    CoreService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CoreModule {}
