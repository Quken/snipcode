import { EditorFontFamilies, EditorThemes } from '@settings/enums';
import { EditorSettings } from '@settings/schemas';

export const EditorDefaultSettings: Omit<EditorSettings, 'userId'> = {
    theme: EditorThemes.Dark,
    fontSize: 14,
    fontFamily: EditorFontFamilies.Consolas,
};
