import { Controller, Get, Query } from '@nestjs/common';
import { nacionData } from 'src/codes/nacionData';
import { CustomIntPipe } from 'src/core/pipes/customInt.pipe';

const orderBenefits = (benefits) => {};

@Controller('benefits')
export class BenefitsController {
  @Get()
  async index(
    @Query('tagName') tagName: string = '',
    @Query('limit', CustomIntPipe) limit: number,
  ) {
    const data = nacionData.accounts
      .filter((item) => item.tags[0]?.name === tagName)
      .slice(0, limit)
      .map((acc) => {
        return {
          ...acc,
          branches: acc.branches.sort((a, b) => a.location - b.location),
        };
      })
      .sort((a, b) => a.branches[0].location - b.branches[0].location)
      .map((item) => {
        return {
          name: item.name,
          image: item.images[0].url,
          crmid: item.crmid,
          benefits: item.benefits.sort((a, b) => (a.type > b.type ? -1 : 1)),
          nearLocation: item.branches[0].location,
        };
      });

    return data;
  }

  @Get('data')
  async getData() {
    return nacionData;
  }
}

// Turismo en Buenos Aires
