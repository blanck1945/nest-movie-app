import { Controller, Get, Redirect } from '@nestjs/common';

@Controller({ path: '' })
export class AppController {
  @Get()
  @Redirect('http://localhost:3333/info', 301)
  appInfo() {}
}
