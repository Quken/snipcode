import { JWTAuthGuard } from '@auth/guard/jwt-guard';
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Res,
    UseGuards,
} from '@nestjs/common';
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
    @Get('editor/:userId')
    public async get(@Param() params) {
        return await this._editorSettingsService.getByUserId(params.userId);
    }

    @UseGuards(JWTAuthGuard)
    @Post('editor/:userId')
    public async update(
        @Body() dto: EditEditorSettingsDTO,
        @Param() params,
    ): Promise<EditEditorSettingsResponse> {
        return this._editorSettingsService.update(dto, params.userId);
    }
}
