import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.use(helmet());
	app.enableCors({
		origin: process.env.FRONTEND_URL,
	});
	await app.listen(3000);
}
bootstrap();
