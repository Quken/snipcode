import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { map, Observable } from 'rxjs';
import { EditorSettingsService } from '../editor-settings';
import { UserSettings } from '../models';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    private _settings$: Observable<UserSettings> | null = null;

    constructor(
        private readonly _editorSettingsService: EditorSettingsService
    ) {}

    public getUserSettings(): Observable<UserSettings> {
        if (!this._settings$) {
            this._settings$ = this._editorSettingsService
                .getEditorSettings()
                .pipe(
                    map((editorSettings: AceEditorSettings) => ({
                        aceEditor: editorSettings,
                    }))
                );
        }

        return this._settings$;
    }
}
