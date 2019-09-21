import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import './defineEnv';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: true
    });

    const document = SwaggerModule.createDocument(app, new DocumentBuilder()
        .setTitle('Authentication MS')
        .setDescription('Authentication MS')
        .setVersion('1.0')
        .setSchemes('https', 'http')
        .build());
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT || 3000);
}
bootstrap().then(() => console.log(`server was started on port ${process.env.PORT}`));
