import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    BehaviorSubject,
    distinctUntilChanged,
    map,
    Observable,
    of,
    take,
    tap,
} from 'rxjs';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class EditorSettingsService {
    private readonly _editorSettingsSubject: BehaviorSubject<AceEditorSettings | null> =
        new BehaviorSubject<AceEditorSettings | null>(null);
    public editorSettings$: Observable<AceEditorSettings | null> =
        this._editorSettingsSubject
            .asObservable()
            .pipe(distinctUntilChanged((prev, curr) => _.isEqual(prev, curr)));

    public loadEditorSettings(): Observable<AceEditorSettings> {
        return this.editorSettings$.pipe(
            map((settings) => {
                if (settings) {
                    return settings;
                }
                this._editorSettingsSubject.next(userSettingsMock.aceEditor);
                return userSettingsMock.aceEditor;
            })
        );
    }

    public update(newSettings: Partial<AceEditorSettings>): Observable<void> {
        return this.editorSettings$.pipe(
            take(1),
            tap((settings) => {
                if (settings) {
                    this._editorSettingsSubject.next({
                        ...settings,
                        ...newSettings,
                    });
                    return;
                }
                this._editorSettingsSubject.next({
                    ...(newSettings as AceEditorSettings),
                });
            }),
            map(() => void 0)
        );
    }
}
