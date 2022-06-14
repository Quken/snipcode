import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas';
import { UserService } from '@user/user';
import { UserModule } from '@user/user.module';
import { SettingsController } from './controller';
import { EditorSettingsService } from './editor-settings-service';
import { EditorSettings, EditorSettingsSchema } from './schemas';

@Module({
    controllers: [SettingsController],
    providers: [EditorSettingsService],
    exports: [EditorSettingsService, MongooseModule],
    imports: [
        forwardRef(() => UserModule),
        MongooseModule.forFeature([
            { name: EditorSettings.name, schema: EditorSettingsSchema },
        ]),
    ],
})
export class SettingsModule {}
