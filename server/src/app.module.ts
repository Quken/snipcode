import 'dotenv/config';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URL, {
            retryAttempts: 2,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            ssl: true,
            connectionFactory: (connection) => {
                console.log('Mongo connection established');
                return connection;
            },
        }),
        AuthModule,
        UserModule,
        SharedModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
