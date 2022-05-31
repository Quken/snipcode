import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    ViewChild,
} from '@angular/core';
import { AceService } from '@core/ace';
import { Snippet } from '@core/snippets';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ace from 'ace-builds';

@Component({
    selector: 'app-snippet-modal',
    templateUrl: './snippet-modal.component.html',
    styleUrls: ['./snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetModalComponent implements AfterViewInit {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;
    @Input()
    public snippet!: Snippet;
    public isEdit: boolean = false;

    private _aceEditor!: ace.Ace.Editor;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _aceService: AceService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public get hasDiff(): boolean {
        return this._aceEditor?.getValue() !== this.snippet.srcRaw;
    }

    public get snippetFullName(): string {
        return `Snippet "${this.snippet.fullSnippetName}"`;
    }

    public ngAfterViewInit(): void {
        this._aceEditor = this._aceService.getAceEditor(
            this.editorElementRef.nativeElement
        );
        this._aceEditor.session.setValue(this.snippet.srcRaw);
        this._aceEditor.session.setMode(`ace/mode/${this.snippet.language}`);
        this._aceEditor.setReadOnly(!this.isEdit);
        this._aceEditor.on('change', () => {
            this._cdr.detectChanges();
        });
        this._cdr.detectChanges();
    }

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onEdit(): void {
        this.isEdit = true;
        this._aceEditor.setReadOnly(!this.isEdit);
    }

    public onSave(): void {
        console.log(this._aceEditor?.getValue());
    }
}
