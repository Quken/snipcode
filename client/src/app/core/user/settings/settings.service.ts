import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { filter, map, Observable, switchMap, take } from 'rxjs';
import { EditorSettingsService } from '../editor-settings';
import { UserSettings } from '../models';
import { UserService } from '../user.service';

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
    private _user$ = this._userService.user$;

    constructor(
        private readonly _editorSettingsService: EditorSettingsService,
        private readonly _userService: UserService
    ) {
        this._user$
            .pipe(
                filter(Boolean),
                take(1),
                switchMap((user) =>
                    this._editorSettingsService.loadEditorSettings(user.id)
                )
            )
            .subscribe();
    }
}
