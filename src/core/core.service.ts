import {
  HttpException,
  Injectable,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from './filters/custom.exeption';
import { ResponseDto } from './dto/response.dto';
import { ResponseService } from './responses/response.service';
import { ERROR_MESSAGES } from './responses/error';

@Injectable()
export class CoreService {
  constructor(private responseService: ResponseService) {}

  @UseFilters(new HttpExceptionFilter())
  async fetch<T>(
    url: string,
    options?: {
      requestOptions?: Partial<RequestInit>;
      plainResponse?: boolean;
      successMessage?: string;
    },
  ): Promise<ResponseDto<T>> {
    try {
      const jsonResult = await fetch(url, options?.requestOptions);

      const result = await jsonResult.json();

      if (result?.detail === 'Not found') {
        throw new NotFoundException(ERROR_MESSAGES('notFound'));
      }

      return this.responseService.success<T>(
        result,
        options?.successMessage || 'Success',
      );
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
        message: ERROR_MESSAGES('notFound'),
        type: 'Axios error',
      },
      500: {
        message: ERROR_MESSAGES('somethingWentWrong'),
        type: 'Server error',
      },
    };

    return errorsMap[error.response.status];
  }

  async query<T>(
    cb,
    options?: {
      successMessage?: string;
    },
  ): Promise<ResponseDto<T>> {
    try {
      const result = await cb();

      return this.responseService.success<T>(
        result,
        options?.successMessage || 'Success',
      );
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
}
