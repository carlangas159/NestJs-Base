import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import 'reflect-metadata';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {TransformInterceptor} from './transform.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
		}),
	);
	app.useGlobalInterceptors(new TransformInterceptor());
	const config = new DocumentBuilder()
		.setTitle('Testing CMAR')
		.setDescription('The admin API description')
		.setVersion('1.0')
		.addTag('admin')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);

	await app.listen(3000);
}

bootstrap();