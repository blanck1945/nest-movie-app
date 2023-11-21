import { Injectable } from '@nestjs/common';
import { nacionData } from './nacionData';

@Injectable()
export class CodesService {
  async index(filter: string, order: string, limit: number) {
    const codes = nacionData.accounts
      .filter((item) => item[filter] === true)
      .slice(0, limit)
      .map((item) => {
        return {
          name: item.name,
          image: item.images[0].url,
          crmid: item.crmid,
        };
      })
      .sort((a, b) => (a.name > b.name ? 1 : -1));

    return codes;
  }
}
