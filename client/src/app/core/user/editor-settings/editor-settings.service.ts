import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    concat,
    iif,
    map,
    merge,
    Observable,
    of,
    ReplaySubject,
    shareReplay,
    Subject,
    switchMap,
    tap,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EditorSettingsService {
    private _editorSettingsSubject: Subject<AceEditorSettings> =
        new ReplaySubject(1);
    public editorSettings$ = this._editorSettingsSubject.asObservable();

    constructor() {}

    public getSettings(): Observable<AceEditorSettings> {
        this._editorSettingsSubject.next(userSettingsMock.aceEditor);
        return this.editorSettings$;
    }

    public update(newSettings: Partial<AceEditorSettings>): Observable<void> {
        console.log(newSettings);
        return of(void 0).pipe(
            switchMap(() => this.editorSettings$),
            tap((settings) => {
                this._editorSettingsSubject.next({
                    ...settings,
                    ...newSettings,
                });
            }),
            map(() => void 0)
        );
    }
}
