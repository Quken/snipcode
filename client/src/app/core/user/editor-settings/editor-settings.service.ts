import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    concatMap,
    filter,
    map,
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
    public editorSettings$ = this._editorSettingsSubject
        .asObservable()
        .pipe(filter((settings) => !!settings));

    public loadEditorSettings(): Observable<AceEditorSettings> {
        return of(userSettingsMock.aceEditor).pipe(
            tap((settings) => {
                this._editorSettingsSubject.next(settings);
            }),
            switchMap(() => this.editorSettings$)
        );
    }

    public update(newSettings: Partial<AceEditorSettings>): Observable<void> {
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
