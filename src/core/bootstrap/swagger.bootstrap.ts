import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerBootstrap = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('BTL REST')
    .setDescription('BTL REST Docs')
    .setVersion('1.0')
    .addServer(
      process.env.API_URL || `http://localhost:${process.env.PORT ?? 3322}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (controllerKey, methodKey) =>
      `${controllerKey.replace('Controller', '')}_${methodKey}`,
  });

  SwaggerModule.setup('docs', app, document);

  return;
};
