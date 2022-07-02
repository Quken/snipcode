import { EditorThemes, EditorFontFamilies } from '@settings/enums';

export interface EditEditorSettingsDTO {
    theme?: EditorThemes;
    fontSize?: number;
    fontFamily?: EditorFontFamilies;
    userId: number;
}
