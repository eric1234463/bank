import './env';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from 'express-session';
import passport from 'passport';
import connectRedis from "connect-redis";
import * as redis from 'redis';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug', 'log', 'error', 'warn'],
  });
  const RedisStore = connectRedis(session);
  app.use(
    // @ts-ignore
    session({
      cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
        signed: false,
      },
      name: 'nest',
      resave: false,
      secret: process.env.SESSION_SECRET_KEY,
      // @ts-ignore
      store: new (connectRedis(session))({client: redis.createClient(process.env.REDIS_URL)}),

      saveUninitialized: true,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Bank API')
    .setDescription('The bank API description')
    .setVersion('1.0')
    .addTag('bank')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-documents', app, document);

  await app.listen(3000);
}
bootstrap();
