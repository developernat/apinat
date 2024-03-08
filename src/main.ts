import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { concat } from 'rxjs';

console.log(  );

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
