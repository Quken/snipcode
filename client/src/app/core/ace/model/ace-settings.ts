import { AceEditorFontFamilies, AceEditorThemes } from '../enum';

export interface AceEditorSettings {
    theme: AceEditorThemes;
    fontSize: number;
    fontFamily: AceEditorFontFamilies;
}
