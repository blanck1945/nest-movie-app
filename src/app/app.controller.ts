import { Controller, Get, Redirect } from '@nestjs/common';

const BASE_PATH =
  process.env.RAILWAY_PUBLIC_DOMAIN || `localhost:${process.env.PORT || 3333}`;

@Controller({ path: '' })
export class AppController {
  @Get()
  @Redirect(`${BASE_PATH}/info`, 301)
  appInfo() {}
}
