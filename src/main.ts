import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import {config} from './lib/env/env-config.manager';
import { allowDevMode } from './lib/dev/dev.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('posts-task/api');
  app.use(helmet());
  allowDevMode(app);
  const port = process.env.PORT || 3000;
  console.log(config)
  await app.listen(port, process.env.HOST || '127.0.0.1');
}
bootstrap();
