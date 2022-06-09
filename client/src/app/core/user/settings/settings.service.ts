import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { filter, map, Observable } from 'rxjs';
import { EditorSettingsService } from '../editor-settings';
import { UserSettings } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    public settings$: Observable<UserSettings> =
        this._editorSettingsService.editorSettings$.pipe(
            filter(Boolean),
            map((editorSettings: AceEditorSettings) => ({
                aceEditor: editorSettings,
            }))
        );

    constructor(
        private readonly _editorSettingsService: EditorSettingsService
    ) {
        this._editorSettingsService.loadEditorSettings().subscribe();
    }
}
