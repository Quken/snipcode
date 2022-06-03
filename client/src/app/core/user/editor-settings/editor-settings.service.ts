import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    concatMap,
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
    public editorSettings$ = this._editorSettingsSubject.asObservable().pipe();

    constructor() {}

    private loadEditorSettings(): Observable<AceEditorSettings> {
        return of(userSettingsMock.aceEditor);
    }

    public getEditorSettings(): Observable<AceEditorSettings> {
        // return this.editorSettings$.pipe(
        //     map((settings) => {
        //         if (!settings) {
        //             this._editorSettingsSubject.next(
        //                 userSettingsMock.aceEditor
        //             );
        //             return userSettingsMock.aceEditor;
        //         }
        //         return settings;
        //     })
        // );
        return this.editorSettings$.pipe(
            concatMap((settings) =>
                !!settings ? of(settings) : this.loadEditorSettings()
            )
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
