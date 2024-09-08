import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecurityHeadersMiddleware } from './common/security/security-headers.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de cabeceras de seguridad
  app.use(new SecurityHeadersMiddleware().use);

  // Configuración de Swagger solo en entorno de desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('API de Blockchain')
      .setDescription('API para interactuar con IOTA Tangle')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  const port = 5000;
  await app.listen(port);

  // Log para mostrar la URL de la API y el Swagger
  const url = `http://localhost:${port}`;
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger is available at: ${url}/api-docs`);
}

bootstrap();