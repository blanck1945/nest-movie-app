import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';

@Controller('')
export class CoreController {
  constructor() {}

  @Get()
  async index() {
    //return await this.coreService.findAll(this.schema, 'product');
  }
}
