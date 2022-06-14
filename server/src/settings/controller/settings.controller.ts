import { JWTAuthGuard } from '@auth/guard/jwt-guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditorSettingsService } from '../editor-settings-service';
import { EditEditorSettingsDTO } from './dto';
import { EditEditorSettingsResponse } from './response';

@ApiTags('Auth')
@Controller('settings')
export class SettingsController {
    constructor(
        private readonly _editorSettingsService: EditorSettingsService,
    ) {}

    @UseGuards(JWTAuthGuard)
    @Post('editor')
    public async update(
        @Body() dto: EditEditorSettingsDTO,
    ): Promise<EditEditorSettingsResponse> {
        return this._editorSettingsService.update(dto);
    }
}
