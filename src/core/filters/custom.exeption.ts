import { Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    console.warn('Este es le filtro', response);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      hasError: true,
      message: exception.message,
      path: request.url,
      type: exception.cause.type || 'API error',
      cuase: exception.cause.message,
    });
  }
}
