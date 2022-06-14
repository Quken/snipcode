import { EditorThemes, EditorFontFamilies } from '@settings/enums';

export interface EditEditorSettingsResponse {
    theme?: EditorThemes;
    fontSize?: number;
    fontFamily?: EditorFontFamilies;
}
