import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { EditorSettingsService } from '../editor-settings';
import { User, UserSettings } from '../models';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    private _settings$: Observable<UserSettings> | null = null;

    constructor(
        private readonly _editorSettingsService: EditorSettingsService
    ) {}

    public getUserSettings(): Observable<UserSettings> {
        this._settings$ = this._editorSettingsService.getSettings().pipe(
            map((editorSettings: AceEditorSettings) => {
                console.log(editorSettings);
                return {
                    aceEditor: editorSettings,
                };
            })
        );
        return this._settings$;
    }
}
