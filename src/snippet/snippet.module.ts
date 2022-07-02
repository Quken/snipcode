import { AuthModule } from '@auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@user/user.module';
import { SnippetController } from './controller/snippet.controller';
import { Snippet, SnippetSchema } from './schemas';
import { SnippetService } from './snippet/snippet.service';

@Module({
    controllers: [SnippetController],
    providers: [SnippetService],
    exports: [SnippetService],
    imports: [
        UserModule,
        AuthModule,
        MongooseModule.forFeature([
            { name: Snippet.name, schema: SnippetSchema },
        ]),
    ],
})
export class SnippetModule {}
