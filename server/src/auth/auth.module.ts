import 'dotenv/config';

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '@user/user.module';
import { AuthController } from './controller';
import { AuthService } from './service';
import { ConfigModule } from '@nestjs/config';

@Module({
    providers: [AuthService],
    exports: [AuthService, JwtModule],
    controllers: [AuthController],
    imports: [
        forwardRef(() => UserModule),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'AWESOME SECRET',
            signOptions: {
                expiresIn: '24h',
            },
        }),
    ],
})
export class AuthModule {}
