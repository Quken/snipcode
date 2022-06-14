import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@user/schemas';
import { UserService } from '@user/user';
import { SettingsController } from './controller';
import { EditorSettingsService } from './editor-settings-service';
import { EditorSettings, EditorSettingsSchema } from './schemas';

@Module({
    controllers: [SettingsController],
    providers: [EditorSettingsService, UserService],
    imports: [
        MongooseModule.forFeature([
            { name: EditorSettings.name, schema: EditorSettingsSchema },
            { name: User.name, schema: UserSchema },
        ]),
    ],
})
export class SettingsModule {}
