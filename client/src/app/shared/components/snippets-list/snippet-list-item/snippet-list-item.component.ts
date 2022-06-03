import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
} from '@angular/core';
import { AceService } from '@core/ace';
import { Snippet } from '@core/snippets';
import { GUID } from '@shared/models';
import * as ace from 'ace-builds';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-snippet-list-item',
    templateUrl: './snippet-list-item.component.html',
    styleUrls: ['./snippet-list-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetListItemComponent implements AfterViewInit, OnDestroy {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;

    private _aceEditor!: ace.Ace.Editor;
    private _subscriptions: Subscription = new Subscription();
    private readonly _lines: number = 10;
    private readonly _maxLength: number = 130;

    @Output()
    public openSnippetEventEmitter: EventEmitter<GUID> = new EventEmitter();

    @Input()
    public snippet!: Snippet;

    @Input()
    public showAuthor: boolean = false;

    constructor(
        private readonly _aceService: AceService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this._subscriptions.add(
            this._aceService
                .getAceEditor$(this.editorElementRef.nativeElement)
                .subscribe((aceEditor) => {
                    this._aceEditor = aceEditor;
                    this._aceEditor.session.setOption('useWorker', false);
                    this._aceEditor.setOptions({
                        minLines: this._lines,
                        maxLines: this._lines,
                        readOnly: true,
                    });
                    const shortenedSource = this.snippet.srcRaw.slice(
                        0,
                        this._maxLength
                    );
                    this._aceEditor.session.setValue(shortenedSource);
                    this._aceEditor.session.setMode(
                        `ace/mode/${this.snippet.language}`
                    );
                    this._cdr.detectChanges();
                })
        );
    }

    public onClick(): void {
        this.openSnippetEventEmitter.emit(this.snippet.id);
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
