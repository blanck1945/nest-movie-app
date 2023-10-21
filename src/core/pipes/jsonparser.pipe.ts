import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class ParseJsonPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    if (!value) {
      return value;
    }

    try {
      return JSON.parse(value);
    } catch (e) {
      throw new BadRequestException(`${value} contains invalid JSON `);
    }
  }
}
