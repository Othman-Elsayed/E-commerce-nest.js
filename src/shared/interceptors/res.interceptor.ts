import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nContext } from 'nestjs-i18n';
import { RESPONSE_META_KEY } from '@shared/decorators/response.decorator';

@Injectable()
export class ResInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const responseMeta = this.reflector.get<{
      status: string;
      message: string;
    }>(RESPONSE_META_KEY, context.getHandler());

    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const i18n = I18nContext.current(request);

    return next.handle().pipe(
      map(async (data) => {
        const message = responseMeta?.message
          ? await i18n?.t(responseMeta.message)
          : undefined;

        return {
          content: data,
          message,
          status: responseMeta?.status || 'success',
          statusCode: ctx.getResponse().statusCode,
        };
      }),
    );
  }
}
