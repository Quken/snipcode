import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    distinctUntilChanged,
    filter,
    map,
    mergeMap,
    Observable,
    of,
    ReplaySubject,
    Subject,
    tap,
} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class EditorSettingsService {
    private readonly _editorSettingsSubject: Subject<AceEditorSettings> =
        new ReplaySubject(1);
    public editorSettings$ = this._editorSettingsSubject.asObservable().pipe(
        filter((settings) => !!settings),
        distinctUntilChanged((prev, curr) => _.isEqual(prev, curr))
    );

    public loadEditorSettings(): Observable<AceEditorSettings> {
        return of(userSettingsMock.aceEditor).pipe(
            tap((settings) => {
                this._editorSettingsSubject.next(settings);
            }),
            mergeMap(() => this.editorSettings$)
        );
    }

    public update(newSettings: Partial<AceEditorSettings>): Observable<void> {
        return of(void 0).pipe(
            mergeMap(() => this.editorSettings$),
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
