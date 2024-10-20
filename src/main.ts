import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { SecurityHeadersMiddleware } from './common/security/security-headers.middleware';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Middleware de cabeceras de seguridad
  app.use(new SecurityHeadersMiddleware().use);

  // Usar tu ValidationPipe personalizado como pipe global
  app.useGlobalPipes(new ValidationPipe());

  const port = 5000;
  const url = `http://localhost:${port}`;
  const swaggerJsonUrl = `${url}/api-docs-json`; // URL del JSON de Swagger
  let document;

  // Configuración de Swagger solo en entorno de desarrollo
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('API de Blockchain')
      .setDescription(`API para interactuar con IOTA Tangle. Puedes ver la documentación en JSON [aquí](${swaggerJsonUrl}).`) // Incluir el link al JSON
      .setVersion('1.0')
      .build();
    document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, document);
  }

  await app.listen(port);

  // Si el entorno no es producción, agrega el endpoint para servir el JSON de Swagger
  if (process.env.NODE_ENV !== 'production') {
    exposeSwaggerJson(app, document);
  }

  // Log para mostrar la URL de la API y el Swagger
  console.log(`Application is running on: ${url}`);
  console.log(`Swagger is available at: ${url}/api-docs`);
}

// Función para exponer el JSON de Swagger en una ruta
function exposeSwaggerJson(app: INestApplication, document: any) {
  app.use('/api-docs-json', (req, res) => {
    res.status(200).json(document);
  });
}

bootstrap();