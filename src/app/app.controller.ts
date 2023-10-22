import { Controller, Get, Redirect } from '@nestjs/common';

@Controller({ path: '' })
export class AppController {
  @Get()
  @Redirect(`${process.env.RAILWAY_PUBLIC_DOMAIN}/info`, 301)
  appInfo() {}
}
