import { Injectable } from '@angular/core';
import { UserSettings, UserSettingsService } from '@core/user';
import * as ace from 'ace-builds';
import { Subscription } from 'rxjs';
import { AceEditorThemes } from './enum';

@Injectable({
    providedIn: 'root',
})
export class AceService {
    private _subscriptions: Subscription = new Subscription();
    private _userSettings: UserSettings | null = null;
    private _ace: any;

    constructor(private readonly _userSettingsService: UserSettingsService) {
        this._setupAce();
        this._subscriptions.add(
            this._userSettingsService.getCurrent().subscribe({
                next: (userSettings: UserSettings) => {
                    this._userSettings = userSettings;
                },
            })
        );
    }

    private _setupAce(): void {
        ace.config.set('fontFamily', 'Roboto Mono');
        ace.config.set('fontSize', '14px');
        ace.config.set(
            'basePath',
            'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
        );
        this._ace = ace;
    }

    public getAceEditor(element: HTMLElement): ace.Ace.Editor {
        const aceEditor = this._ace.edit(element);
        const theme =
            this._userSettings?.aceEditorTheme ?? AceEditorThemes.Dark;
        aceEditor.setTheme(`ace/theme/${theme}`);
        return aceEditor;
    }
}
