import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  });
  await app.listen(process.env.PORT ?? 3000);


}
bootstrap();
