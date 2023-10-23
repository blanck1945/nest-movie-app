import { ApiProperty } from '@nestjs/swagger';

export class InfoResponse {
  @ApiProperty({ example: 'App name' })
  appName: string;
  @ApiProperty({ example: '1.0.0' })
  version: string;
  @ApiProperty({
    example: 'github://',
    externalDocs: {
      url: 'https://github.com/blanck1945/nest-movie-app',
    },
  })
  githubRepo: string;
  @ApiProperty({
    example: 'swagger://',
    externalDocs: {
      url: 'https://nest-movie-app-production.up.railway.app/api',
    },
  })
  swagger: string;
  @ApiProperty({
    example: 'notion://',
    externalDocs: {
      url: 'https://nest-movie-app-production.up.railway.app/api',
    },
  })
  notion: string;
}
