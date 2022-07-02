import 'dotenv/config';
import * as cookieParser from 'cookie-parser';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APPLICATION_PORT = Number(process.env.APPLICATION_PORT) || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.ORIGIN_DEV_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    });
    await app.listen(APPLICATION_PORT, () =>
        console.log(`Listening on port ${APPLICATION_PORT}`),
    );
}
bootstrap();
