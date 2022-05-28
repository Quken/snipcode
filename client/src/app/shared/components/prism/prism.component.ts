import { Component, ElementRef, Input, AfterViewInit } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
    selector: 'app-prism, [prism]',
    template: '<ng-content></ng-content>',
    styles: [
        `
            :host.dark {
                background: #333;
                color: #fff;
            }
        `,
    ],
})
export class PrismComponent implements AfterViewInit {
    @Input() code!: string;
    @Input() language: string = 'javascript';

    constructor(private _el: ElementRef) {}

    public ngAfterViewInit(): void {
        let code = this.code || this._el.nativeElement.innerText;
        code = this.fixIndent(code).trim();
        const grammar = Prism.languages[this.language];
        const html = Prism.highlight(code, grammar, this.language);
        this._el.nativeElement.innerHTML = html;
    }

    private fixIndent(code: string): string {
        const removeThis = (code.match(/^([ ]+)/) || [])[1];
        if (removeThis) {
            const re = new RegExp(`^${removeThis}`, 'gm');
            return code.replace(re, '');
        }
        return code;
    }
}
