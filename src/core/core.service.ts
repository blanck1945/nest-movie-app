import { HttpException, Injectable, UseFilters } from '@nestjs/common';
import { Document, Types } from 'mongoose';
import { User } from '../auth/schema/user.schema';
import { HttpExceptionFilter } from './filters/custom.exeption';

type MongoOptions = {
  conditions?: any;
  select?: any;
  sort?: 'asc' | 'desc' | 'ascending' | 'descending' | 1 | -1;
  populate?: any;
  limit?: number;
};

const TypeMap = {
  user: new User(),
} as const;

export class ErrorHandler extends HttpException {
  private readonly hasError: boolean;

  constructor(message: string, status: number) {
    super(message, status);
  }

  static handleErrors(error) {
    const defaultErrorConfig = {
      hasError: true,
      message: error.message,
      status: error.response.status,
    };

    const ref = {
      ...defaultErrorConfig,
      type: 'Axios error',
    };

    console.warn('ref', ref);

    if (error.response.status === 404) {
      return {
        ...defaultErrorConfig,
        type: 'Axios error',
      };
    } else {
      return {
        ...defaultErrorConfig,
        type: 'API error',
      };
    }
  }
}

@Injectable()
export class CoreService {
  // **************************** WRAPPER *********************************** //

  @UseFilters(new HttpExceptionFilter())
  async wrapper(cb, options?: { plainResponse?: boolean }) {
    try {
      const result = await cb();

      if (options?.plainResponse) {
        return result;
      }
      return result.data;
    } catch (error) {
      throw new HttpException(
        error?.response?.data || error.message,
        error?.response?.status || 500,
        {
          cause: this.handleErrors(error),
        },
      );
    }
  }

  handleErrors(error) {
    const errorsMap = {
      404: {
        message: 'Record not found',
        type: 'Axios error',
      },
      500: {
        message: 'Something went wrong',
        type: 'Server error',
      },
    };

    return errorsMap[error.response.status];
  }

  // ************************************************************************ //

  // **************************** QUERIES *********************************** //

  async findAll<T extends keyof typeof TypeMap>(
    schema,
    model: T,
    options?: MongoOptions,
  ) {
    const optionsObj = this.createOptionsObj(options);

    const Type = TypeMap[model];

    return (await schema
      .find(optionsObj.conditions)
      .select(optionsObj.select)
      .sort(optionsObj.sort)
      .limit(optionsObj.limit)
      .exec()) as (Document<unknown, {}, typeof Type> &
      typeof Type & {
        _id: Types.ObjectId;
      })[];
  }

  async findById<T extends keyof typeof TypeMap>(
    schema,
    model: T,
    id: string,
    options: MongoOptions,
  ) {
    const optionsObj = this.createOptionsObj(options);
    const Type = TypeMap[model];
    return (await schema
      .findById(id)
      .select(optionsObj.select)
      .sort(optionsObj.sort)
      .exec()) as Document<unknown, {}, typeof Type> &
      typeof Type & {
        _id: Types.ObjectId;
      };
  }

  async findOne<T extends keyof typeof TypeMap>(
    schema,
    model: T,
    options: MongoOptions,
  ) {
    const optionsObj = this.createOptionsObj(options);
    const Type = TypeMap[model];
    try {
      return (await schema
        .findOne(optionsObj.conditions)
        .select(optionsObj.select)
        .sort(optionsObj.sort)
        .populate(optionsObj.populate)
        .exec()) as Document<unknown, {}, typeof Type> &
        typeof Type & {
          _id: Types.ObjectId;
        };
    } catch (err) {
      console.log(err);
    }
  }

  async insert(schema, data): Promise<any> {
    return await schema.create(data);
  }

  async update(schema, { id, data }): Promise<any> {
    const row = await this.checkExist(schema, { id });

    const newRow = Object.assign(row, data);
    const createdRow = await newRow.save();

    return createdRow;
  }

  async soft_delete(schema, { id }): Promise<any> {
    const row = await this.checkExist(schema, { id });

    row.deleted_at = new Date();
    await row.save();
  }

  async hard_delete(schema, { id }): Promise<any> {
    const row = await this.checkExist(schema, { id });

    await row.remove();
  }

  /************************************************************************/

  /**************************** HELPERS ***********************************/
  private async checkExist(schema, { id }): Promise<any> {
    const row = schema.findById(id).exec();

    if (!row) {
      throw new Error('Not found');
    }

    return row;
  }

  private createOptionsObj(options): MongoOptions {
    return {
      ...((options?.conditions && { conditions: options.conditions }) || {
        conditions: {},
      }),
      ...((options?.select && { select: options.select }) || { select: '' }),
      ...(options?.sort ? { sort: options.sort } : { sort: 'asc' }),
      ...((options?.limit && { limit: options.limit }) || { limit: 10 }),
      ...((options?.populate && { populate: options.populate }) || null),
    };
  }

  /************************************************************************/
}
