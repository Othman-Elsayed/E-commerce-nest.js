import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { AcceptLanguageResolver, QueryResolver } from 'nestjs-i18n';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { I18nValidationExceptionFilter } from '@shared/filters/http-exception.filter';
import { MailModule } from './mail/mail.module';
import { OtpModule } from './otp/otp.module';
import { AuthModule } from './auth/auth.module';
import * as path from 'path';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      cache: true, // Add caching for better performance
    }),

    // Database
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DB_URI'),
        dbName: configService.get<string>('MONGO_DB_NAME'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
      inject: [ConfigService],
    }),

    // Internationalization
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/shared/i18n/'),
        watch: true, // Only watch in development
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),

    // Feature Modules
    UsersModule,
    MailModule,
    OtpModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, I18nValidationExceptionFilter],
})
export class AppModule {}
