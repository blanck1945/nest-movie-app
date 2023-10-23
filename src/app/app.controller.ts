import { Controller, Get, Redirect } from '@nestjs/common';

@Controller({ path: '' })
export class AppController {
  @Get()
  @Redirect(`${process.env.BASE_URL}/info`, 301)
  appInfo() {}
}
