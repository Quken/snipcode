import { EditorThemes, EditorFontFamilies } from '../enums';

export interface EditorSettings {
    theme: EditorThemes;
    fontSize: number;
    fontFamily: EditorFontFamilies;
}
