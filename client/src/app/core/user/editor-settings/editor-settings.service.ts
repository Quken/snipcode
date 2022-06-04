import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    defaultIfEmpty,
    distinctUntilChanged,
    filter,
    last,
    map,
    merge,
    mergeMap,
    Observable,
    of,
    ReplaySubject,
    Subject,
    switchMap,
    take,
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

    public loadEditorSettings(): void {
        of(userSettingsMock.aceEditor)
            .pipe(last())
            .subscribe((settings) => {
                this._editorSettingsSubject.next(settings);
            });
    }

    public update(newSettings: Partial<AceEditorSettings>): Observable<void> {
        return of(void 0).pipe(
            switchMap(() => this.editorSettings$),
            take(1),
            tap((settings) => {
                this._editorSettingsSubject.next({
                    ...settings,
                    ...newSettings,
                });
            }),
            switchMap(() => this.editorSettings$),
            take(1),
            map(() => void 0)
        );
    }
}
