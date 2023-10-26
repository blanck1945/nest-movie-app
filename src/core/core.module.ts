import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/custom.exeption';
import { ResponseService } from './responses/response.service';

@Module({
  imports: [],
  providers: [
    CoreService,
    ResponseService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class CoreModule {}
