import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { userSettingsMock } from '@mocks/user';

import {
    BehaviorSubject,
    distinctUntilChanged,
    map,
    Observable,
    take,
    tap,
} from 'rxjs';
import * as _ from 'lodash';
import { UpdateEditorSettingsDTO } from './models';
import { ApiService } from '@core/api';

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
        const url = ApiService.editorSettings;
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

    public update(newSettings: UpdateEditorSettingsDTO): Observable<void> {
        const url = ApiService.editorSettings;
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
                    ...(newSettings as unknown as AceEditorSettings),
                });
            }),
            map(() => void 0)
        );
    }
}
