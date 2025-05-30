import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { Response } from 'express';
import { I18nValidationException, I18nService } from 'nestjs-i18n';
import { Inject } from '@nestjs/common';

@Catch(
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  I18nValidationException,
  ForbiddenException,
)
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
    } else {
      const exceptionResponse = exception.getResponse();
      // const [key] = (exceptionResponse as any).message
      //   ?.split(' ')
      //   ?.map((el) => el?.toString()?.toLowerCase());
      messages['generic'] = (exceptionResponse as any).message;
    }

    response.status(statusCode).json({
      statusCode,
      message: this.i18n.t('translate.errors.generic'),
      errors: messages,
      status: error,
    });
  }
}
