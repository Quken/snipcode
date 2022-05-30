import * as ace from 'ace-builds';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    ViewChild,
} from '@angular/core';
import { AceService } from '@core/ace';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetLanguage, snippetLanguages } from '../models';
import { TitleCasePipe } from '@angular/common';

@Component({
    selector: 'app-create-snippet-modal',
    templateUrl: './create-snippet-modal.component.html',
    styleUrls: ['./create-snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TitleCasePipe],
})
export class CreateSnippetModalComponent implements AfterViewInit {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;
    public readonly snippetLanguages = snippetLanguages;
    public selectedLanguage: SnippetLanguage | null = null;

    private _aceEditor!: ace.Ace.Editor;

    public get dropdownTitle(): string {
        return this.selectedLanguage
            ? this._titleCasePipe.transform(this.selectedLanguage)
            : 'Select language';
    }

    public get isDisabled(): boolean {
        return !this.selectedLanguage || !this._code?.length;
    }

    private get _code(): string {
        return this._aceEditor?.getValue();
    }

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _aceService: AceService,
        private readonly _titleCasePipe: TitleCasePipe,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngAfterViewInit(): void {
        this._aceEditor = this._aceService.getAceEditor(
            this.editorElementRef.nativeElement
        );
        this._aceEditor.session.setValue('Write your code here');
        this._aceEditor.on('change', (e) => {
            this._cdr.detectChanges();
        });
        this._cdr.detectChanges();
    }

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onSave(): void {
        console.log(this._code);
    }

    public onLanguageSelect(language: string): void {
        this.selectedLanguage = <SnippetLanguage>language;
        this._aceEditor.session.setMode(`ace/mode/${this.selectedLanguage}`);
    }
}
