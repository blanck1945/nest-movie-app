import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  public success<T>(data: T, msg?: string) {
    return {
      hasError: false,
      message: msg || 'success',
      data,
    };
  }
}
