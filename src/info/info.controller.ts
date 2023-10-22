import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppInfoResponse } from '../app/swagger/appInfo.model';
import { InfoService } from './info.service';

@Controller('info')
@ApiTags('Informacion general de la aplicacion')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @Get()
  @ApiOkResponse({ description: 'App information', type: AppInfoResponse })
  appInfo() {
    return this.infoService.appInfo();
  }
}
