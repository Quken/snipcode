import {
    AfterViewInit,
    ChangeDetectionStrategy,
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
    @Input()
    snippet!: Snippet;

    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _aceService: AceService
    ) {}

    public get snippetFullName(): string {
        return `Snippet "${this.snippet.fullSnippetName}"`;
    }

    public ngAfterViewInit(): void {
        const aceEditor = this._aceService.getAceEditor(
            this.editorElementRef.nativeElement
        );
        aceEditor.session.setValue(this.snippet.srcRaw);
        aceEditor.session.setMode(`ace/mode/${this.snippet.language}`);
        aceEditor.setReadOnly(true);
    }

    public onClose() {
        this.activeModal.dismiss();
    }
}
