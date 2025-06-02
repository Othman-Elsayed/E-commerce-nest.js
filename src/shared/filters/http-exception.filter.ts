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
      const lang = (request as any).i18nLang || 'en';
      const validationErrors = exception.errors;

      const extractedMessages = await this.extractValidationMessages(
        validationErrors,
        lang,
      );
      Object.assign(messages, extractedMessages);
    } else {
      const exceptionResponse = exception.getResponse();
      messages['generic'] =
        typeof exceptionResponse === 'object'
          ? (exceptionResponse as any).message
          : exceptionResponse;
    }

    response.status(statusCode).json({
      statusCode,
      message: this.i18n.t('translate.errors.generic'),
      errors: messages,
      status: error,
    });
  }

  private async extractValidationMessages(
    errors: any[],
    lang: string,
    parentPath = '',
  ): Promise<Record<string, string>> {
    const messages: Record<string, string> = {};

    for (const err of errors) {
      const currentPath = parentPath
        ? `${parentPath}.${err.property}`
        : err.property;

      if (err.constraints) {
        for (const key of Object.values(err.constraints)) {
          const [msgKey, argsString] = String(key).split('|');
          const args = argsString ? JSON.parse(argsString || '{}') : {};
          const translated = await this.i18n.translate(msgKey, {
            lang,
            args,
          });
          messages[currentPath] = translated as string;
          break;
        }
      }

      if (err.children && err.children.length > 0) {
        const childMessages = await this.extractValidationMessages(
          err.children,
          lang,
          currentPath,
        );
        Object.assign(messages, childMessages);
      }
    }

    return messages;
  }
}
