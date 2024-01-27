import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);
  app.setViewEngine('hbs');
  await app.listen(3000);
  console.log(`🚀 server running port http://localhost:${3000}`);
}
bootstrap();
