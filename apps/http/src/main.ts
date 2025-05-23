import { NestFactory } from '@nestjs/core';
import { HttpModule } from './http.module';

async function bootstrap() {
  const app = await NestFactory.create(HttpModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
