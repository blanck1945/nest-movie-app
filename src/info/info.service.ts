import { Injectable } from '@nestjs/common';

@Injectable()
export class InfoService {
  appInfo() {
    return {
      appName: 'Movie App - Conexa',
      version: '1.0.0',
      githubRepo: 'https://github.com/blanck1945/nest-movie-app',
      swagger: 'https://nest-movie-app-production.up.railway.app/api',
      notion: '',
    };
  }
}
