import * as ace from 'ace-builds';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { AceService } from '@core/ace';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Snippet, SnippetLanguage, snippetLanguages } from '../models';
import { TitleCasePipe } from '@angular/common';
import { SnippetsService } from '../snippets.service';
import { ToastService } from '@core/toast/toast.service';
import { Toast } from '@core/toast/models';
import { SnippetExtensionsEnum } from '../enums/snippets-extensions.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-snippet-modal',
    templateUrl: './create-snippet-modal.component.html',
    styleUrls: ['./create-snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TitleCasePipe],
})
export class CreateSnippetModalComponent implements OnInit, AfterViewInit {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;
    public readonly snippetLanguages = snippetLanguages;
    public selectedLanguage: SnippetLanguage | null = null;
    public formGroup!: FormGroup;

    private _aceEditor!: ace.Ace.Editor;

    public get dropdownTitle(): string {
        return this.selectedLanguage
            ? this._titleCasePipe.transform(this.selectedLanguage)
            : 'Select language';
    }

    public get isDisabled(): boolean {
        return (
            !this.selectedLanguage ||
            !this._code?.length ||
            !this.formGroup.valid
        );
    }

    public get extension(): SnippetExtensionsEnum | null {
        if (this.selectedLanguage) {
            return SnippetExtensionsEnum[this.selectedLanguage];
        }
        return null;
    }

    public get isNameInvalid(): boolean {
        return (
            this.formGroup.controls['name'].invalid &&
            (this.formGroup.controls['name'].dirty ||
                this.formGroup.controls['name'].touched)
        );
    }

    private get _code(): string {
        return this._aceEditor?.getValue();
    }

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _aceService: AceService,
        private readonly _titleCasePipe: TitleCasePipe,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _snippetsService: SnippetsService,
        private readonly _toastService: ToastService,
        private readonly _formBuilder: FormBuilder
    ) {}

    private _initForm(): void {
        this.formGroup = this._formBuilder.group({
            name: [
                '',
                {
                    validators: [
                        Validators.required,
                        Validators.minLength(4),
                        Validators.pattern(/\w/gim),
                    ],
                },
            ],
        });
    }

    public ngAfterViewInit(): void {
        this._aceEditor = this._aceService.getAceEditor(
            this.editorElementRef.nativeElement
        );
        this._aceEditor.session.setValue('Write your code here');
        this._aceEditor.on('change', () => {
            this._cdr.detectChanges();
        });
        this._cdr.detectChanges();
    }

    public ngOnInit(): void {
        this._initForm();
    }

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onSubmit(): void {
        const language = <SnippetLanguage>this.selectedLanguage;
        const snippet: Partial<Snippet> = {
            srcRaw: this._code,
            language,
            likes: 0,
            extension: SnippetExtensionsEnum[language],
            name: this.formGroup.controls['name'].value,
        };
        this._snippetsService.create(snippet).subscribe({
            next: () => {
                this.activeModal.close('Success');
                const toast: Toast = {
                    textOrTemplate: 'Successfully saved',
                };
                this._toastService.showSuccess(toast);
            },
            error: (e) => {
                console.error(e);
                const toast: Toast = {
                    textOrTemplate: 'Saving failed',
                };
                this._toastService.showDanger(toast);
            },
        });
    }

    public onLanguageSelect(language: string): void {
        this.selectedLanguage = <SnippetLanguage>language;
        this._aceEditor.session.setMode(`ace/mode/${this.selectedLanguage}`);
    }
}
