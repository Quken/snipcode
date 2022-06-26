import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GUID } from '@shared/models';
import { User, UserDocument } from '@user/schemas';
import { Model } from 'mongoose';
import { EditEditorSettingsDTO } from '../controller';
import { EditorSettings, EditorSettingsDocument } from '../schemas';
import { EditorDefaultSettings } from './default-settings';

@Injectable()
export class EditorSettingsService {
    constructor(
        @InjectModel(EditorSettings.name)
        private readonly _editorSettingsRepository: Model<EditorSettingsDocument>,
        @InjectModel(User.name)
        private readonly _userRepository: Model<UserDocument>,
    ) {}

    public async getByUserId(userId: GUID): Promise<EditorSettings> {
        const data = await this._editorSettingsRepository.findOne({ userId });
        return {
            fontFamily: data.fontFamily,
            fontSize: data.fontSize,
            theme: data.theme,
            userId: data.userId,
        };
    }

    public async createDefaultSettings(
        userId: string,
    ): Promise<EditorSettings> {
        return await this._editorSettingsRepository.create({
            userId,
            ...EditorDefaultSettings,
        });
    }

    public async update(
        dto: EditEditorSettingsDTO,
        userId: GUID,
    ): Promise<EditorSettings> {
        const user = await this._userRepository.findById(userId);
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const editorSettings = await this._editorSettingsRepository.findOne({
            userId,
        });
        if (dto.theme) {
            editorSettings.theme = dto.theme;
        }
        if (dto.fontFamily) {
            editorSettings.fontFamily = dto.fontFamily;
        }
        if (dto.fontSize) {
            editorSettings.fontSize = dto.fontSize;
        }
        await editorSettings.save();
        return editorSettings;
    }
}
