import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild,
} from '@angular/core';
import { AceService } from '@core/ace';
import { Snippet } from '@core/snippets';
import { GUID } from '@shared/models';
import * as ace from 'ace-builds';

@Component({
    selector: 'app-snippet-list-item',
    templateUrl: './snippet-list-item.component.html',
    styleUrls: ['./snippet-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetListItemComponent implements AfterViewInit {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;

    private _aceEditor!: ace.Ace.Editor;
    private readonly _lines: number = 10;
    private readonly _maxLength: number = 130;

    @Output()
    public openSnippetEventEmitter: EventEmitter<GUID> = new EventEmitter();

    @Input()
    snippet!: Snippet;

    constructor(
        private readonly _aceService: AceService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this._aceEditor = this._aceService.getAceEditor(
            this.editorElementRef.nativeElement
        );
        this._aceEditor.session.setOption('useWorker', false);
        this._aceEditor.setOptions({
            lines: this._lines,
            readOnly: true,
        });
        const shortenedSource = this.snippet.srcRaw.slice(0, this._maxLength);
        this._aceEditor.session.setValue(shortenedSource);
        this._aceEditor.session.setMode(`ace/mode/${this.snippet.language}`);
        this._cdr.detectChanges();
    }

    public onClick(): void {
        this.openSnippetEventEmitter.emit(this.snippet.id);
    }
}
