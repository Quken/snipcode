import { Injectable } from '@angular/core';

import * as ace from 'ace-builds';

@Injectable({
    providedIn: 'root',
})
export class AceService {
    private _ace: any;

    constructor() {
        ace.config.set('fontSize', '14px');
        ace.config.set(
            'basePath',
            'https://unpkg.com/ace-builds@1.4.12/src-noconflict'
        );
        this._ace = ace;
    }

    public getAceEditor(element: HTMLElement): ace.Ace.Editor {
        const aceEditor = this._ace.edit(element);
        aceEditor.setTheme('ace/theme/twilight');
        return aceEditor;
    }
}
