import { AceEditorThemes, AceEditorFontFamilies } from '@core/ace/enum';

export interface UpdateEditorSettingsDTO {
    theme?: AceEditorThemes;
    fontSize?: number;
    fontFamily?: AceEditorFontFamilies;
}
