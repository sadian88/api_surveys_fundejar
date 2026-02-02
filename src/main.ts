import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Fundejar Survey API')
    .setDescription('API documentation for the Fundejar Survey system')
    .setVersion('1.0')
    .addTag('attendees')
    .addTag('surveys')
    .addTag('registrations')
    .addTag('courses')
    .addTag('attendance')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
