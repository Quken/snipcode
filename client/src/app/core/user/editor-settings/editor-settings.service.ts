import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    map,
    Observable,
    of,
    ReplaySubject,
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

    constructor() {
        this._editorSettingsSubject.next(userSettingsMock.aceEditor);
    }

    public getEditorSettings(): Observable<AceEditorSettings> {
        return this.editorSettings$.pipe(
            tap((settings) => {
                if (!settings) {
                    this._editorSettingsSubject.next(
                        userSettingsMock.aceEditor
                    );
                }
            })
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
