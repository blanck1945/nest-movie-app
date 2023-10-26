import { Catch, HttpException } from '@nestjs/common';
import { ExeptionDto } from '../responses/exeption.dto';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    const jsonResponse: ExeptionDto = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      type: exception?.cause?.type || 'API error',
    };

    response.status(status).json({
      hasError: true,
      message: exception?.cause?.message || exception.message,
      ...jsonResponse,
    });
  }
}
