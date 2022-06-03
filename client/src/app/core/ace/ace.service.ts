import { Injectable } from '@angular/core';
import { UserSettings, UserSettingsService } from '@core/user';
import * as ace from 'ace-builds';
import { map, Observable, ReplaySubject, Subscription } from 'rxjs';
import { AceEditorThemes } from './enum';

@Injectable({
    providedIn: 'root',
})
export class AceService {
    private _subscriptions: Subscription = new Subscription();
    private _userSettings: UserSettings | null = null;
    private _aceSubject = new ReplaySubject(1);
    private _ace$: Observable<any> = this._aceSubject.asObservable();

    constructor(private readonly _userSettingsService: UserSettingsService) {
        this._subscriptions.add(
            this._userSettingsService.settings$.subscribe({
                next: (userSettings: UserSettings) => {
                    this._userSettings = userSettings;
                    this._setupAce();
                },
            })
        );
    }

    private _setupAce(): void {
        const fontFamily =
            this._userSettings?.aceEditor.fontFamily ?? 'Roboto Mono';
        const fontSize = this._userSettings?.aceEditor.fontSize ?? 14;
        ace.config.set('fontFamily', fontFamily);
        ace.config.set('fontSize', `${fontSize}px`);
        ace.config.set(
            'basePath',
            'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
        );
        this._aceSubject.next(ace);
    }

    public getAceEditor$(element: HTMLElement): Observable<ace.Ace.Editor> {
        return this._ace$.pipe(
            map((ace) => {
                const aceEditor = ace.edit(element);
                const theme =
                    this._userSettings?.aceEditor.theme ?? AceEditorThemes.Dark;
                aceEditor.setTheme(`ace/theme/${theme}`);
                return aceEditor;
            })
        );
    }
}
