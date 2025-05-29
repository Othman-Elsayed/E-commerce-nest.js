import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { useContainer } from 'class-validator';
import { ResInterceptor } from '@shared/interceptors/res.interceptor';
import { I18nValidationPipe } from 'nestjs-i18n';
import { I18nValidationExceptionFilter } from '@shared/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Prefix and Versioning
  app.setGlobalPrefix('api');

  // Enable DI for class-validator (needed for i18n inside DTOs)
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // Global i18n validation pipe
  app.useGlobalPipes(
    new I18nValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);

  // Global Filters and Interceptors
  app.useGlobalFilters(
    app.select(AppModule).get(I18nValidationExceptionFilter),
  );
  app.useGlobalInterceptors(new ResInterceptor(reflector));

  // CORS
  app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const port = process.env.PORT || 27019;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch((err) => {
  console.error('Failed to start application:', err);
  process.exit(1);
});
