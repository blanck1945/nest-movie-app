import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import mongoose from 'mongoose';

@Injectable()
export class MongooseIdPipe implements PipeTransform {
  transform(value: any, _metadata: ArgumentMetadata) {
    const result = mongoose.isValidObjectId(value);

    if (!result) {
      throw new BadRequestException(`${value} is not a valid mongoose id `);
    }
    return value;
  }
}
