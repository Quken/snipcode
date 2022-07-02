import 'dotenv/config';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './settings/settings.module';
import { SnippetModule } from './snippet/snippet.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'front-dist'),
        }),
        MongooseModule.forRoot(process.env.MONGO_URL, {
            retryAttempts: 2,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            ssl: true,
            connectionFactory: (connection) => {
                console.log('Mongo connection established');
                console.log(join(__dirname, '..', 'front-dist'));
                return connection;
            },
        }),
        AuthModule,
        UserModule,
        SharedModule,
        SettingsModule,
        SnippetModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
