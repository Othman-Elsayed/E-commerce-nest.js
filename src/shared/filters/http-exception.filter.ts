import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException, I18nService } from 'nestjs-i18n';
import { Inject } from '@nestjs/common';

@Catch(BadRequestException, I18nValidationException)
export class I18nValidationExceptionFilter implements ExceptionFilter {
  constructor(@Inject(I18nService) private readonly i18n: I18nService) {}

  async catch(
    exception: BadRequestException | I18nValidationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const statusCode = exception.getStatus();

    const messages: Record<string, string> = {};
    let error = 'Bad Request';

    if (exception instanceof I18nValidationException) {
      const validationErrors = exception.errors;

      for (const err of validationErrors) {
        if (typeof err.property === 'string' && err.constraints) {
          for (const key of Object.values(err.constraints)) {
            const [msgKey, argsString] = key.split('|');
            const args = argsString ? JSON.parse(argsString || '{}') : {};
            const translated = await this.i18n.translate(msgKey, {
              lang: (request as any).i18nLang || 'en',
              args,
            });
            messages[err.property] = translated as string;
            break;
          }
        }
      }
    } else if (exception instanceof BadRequestException) {
      const exceptionResponse = exception.getResponse();

      if (
        typeof exceptionResponse === 'object' &&
        exceptionResponse !== null &&
        Array.isArray((exceptionResponse as any).message)
      ) {
        const validationErrors = (exceptionResponse as any).message;

        for (const err of validationErrors) {
          if (typeof err.property === 'string' && err.constraints) {
            const firstConstraint = Object.values(err.constraints)[0];
            if (typeof firstConstraint === 'string') {
              messages[err.property] = firstConstraint;
            }
          }
        }

        error = (exceptionResponse as any).error || 'Bad Request';
      } else if (typeof exceptionResponse === 'string') {
        messages['error'] = exceptionResponse;
      } else {
        messages['error'] = 'Bad Request';
      }
    }

    if (Object.keys(messages).length === 0) {
      messages['error'] = 'Bad Request';
    }

    response.status(statusCode).json({
      statusCode,
      message: messages,
      status: error,
    });
  }
}
