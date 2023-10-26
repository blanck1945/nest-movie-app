import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { InfoResponse } from './core/swagger/appInfo.model';
import { AppService } from './appservice';

@Controller()
@ApiTags('Informacion general de la aplicacion')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/info')
  redirect() {}

  @Get('info')
  @ApiOkResponse({ description: 'App information', type: InfoResponse })
  appInfo(): InfoResponse {
    return this.appService.appInfo();
  }
}
