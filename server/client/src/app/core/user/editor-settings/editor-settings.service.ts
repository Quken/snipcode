import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';

import {
    BehaviorSubject,
    distinctUntilChanged,
    map,
    Observable,
    tap,
} from 'rxjs';
import * as _ from 'lodash';
import { UpdateEditorSettingsDTO } from './models';
import { ApiService } from '@core/api';
import { HttpClient } from '@angular/common/http';
import { GUID } from '@shared/models';

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

    constructor(private readonly _httpClient: HttpClient) {}

    public loadEditorSettings(userId: GUID): Observable<AceEditorSettings> {
        const url = `${ApiService.editorSettings}/${userId}`;
        return this._httpClient.get<AceEditorSettings>(url).pipe(
            tap((settings) => {
                this._editorSettingsSubject.next(settings);
            })
        );
    }

    public update(
        newSettings: UpdateEditorSettingsDTO,
        userId: GUID
    ): Observable<void> {
        const url = `${ApiService.editorSettings}/${userId}`;
        return this._httpClient.post(url, newSettings).pipe(
            tap((settings) => {
                this._editorSettingsSubject.next({
                    ...(settings as unknown as AceEditorSettings),
                });
            }),
            map(() => void 0)
        );
    }
}
