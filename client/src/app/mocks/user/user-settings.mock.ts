import { AceEditorFontFamilies, AceEditorThemes } from '@core/ace/enum';
import { UserSettings } from '@core/user';

export const userSettingsMock: UserSettings = {
    aceEditor: {
        theme: AceEditorThemes.Light,
        fontSize: 18,
        fontFamily: AceEditorFontFamilies['Roboto Mono'],
    },
};
