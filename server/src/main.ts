import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const APPLICATION_PORT = Number(process.env.APPLICATION_PORT) || 3000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(APPLICATION_PORT, () =>
        console.log(`Listening on port ${APPLICATION_PORT}`),
    );
}
bootstrap();
