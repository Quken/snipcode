import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { filter, map, Observable, shareReplay } from 'rxjs';
import { EditorSettingsService } from '../editor-settings';
import { UserSettings } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    public settings$: Observable<UserSettings> = this._editorSettingsService
        .getEditorSettings()
        .pipe(
            filter((editorSettings) => !!editorSettings),
            map((editorSettings: AceEditorSettings) => ({
                aceEditor: editorSettings,
            })),
            shareReplay(1)
        );

    constructor(
        private readonly _editorSettingsService: EditorSettingsService
    ) {}
}
