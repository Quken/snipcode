import { Injectable } from '@angular/core';
import { AceEditorSettings } from '@core/ace/model';
import { Observable, of, shareReplay } from 'rxjs';
import { UserSettingsService } from '../settings';

@Injectable({
    providedIn: 'root',
})
export class EditorSettingsService {
    public editorSettings$ = this._userSettingsService
        .getCurrentSettings()
        .pipe(shareReplay(1));

    constructor(private readonly _userSettingsService: UserSettingsService) {}

    public update(settings: Partial<AceEditorSettings>): Observable<void> {
        console.log(settings);
        return of(void 0);
    }
}
