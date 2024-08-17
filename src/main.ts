import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swaggerBootstrap } from './core/bootstrap/swagger.bootstrap';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerBootstrap(app);
  await app.listen(process.env.PORT || 3322);
}
bootstrap();
