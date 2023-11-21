import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { CodesService } from './codes.service';
import { nacionData } from './nacionData';

@Controller('codes')
export class CodesController {
  constructor(private readonly codesService: CodesService) {}

  @Get()
  async index(
    @Query('filter') filter: string,
    @Query('order') order: string,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.codesService.index(filter, order, limit);
  }

  @Get('data')
  async getData() {
    return nacionData;
  }
}
