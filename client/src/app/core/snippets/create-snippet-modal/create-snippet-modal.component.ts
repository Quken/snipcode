import * as ace from 'ace-builds';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    OnDestroy,
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
import { Subscription } from 'rxjs';
import { MaskService } from '@core/mask';
import { isControlInvalid } from '@core/form';

@Component({
    selector: 'app-create-snippet-modal',
    templateUrl: './create-snippet-modal.component.html',
    styleUrls: ['./create-snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TitleCasePipe],
})
export class CreateSnippetModalComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    private readonly _subscriptions: Subscription = new Subscription();

    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;
    public readonly snippetLanguages = snippetLanguages;
    public selectedLanguage: SnippetLanguage | null = null;
    public formGroup!: FormGroup;
    public isControlInvalid = isControlInvalid;

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
        private readonly _formBuilder: FormBuilder,
        private readonly _maskService: MaskService
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
                        Validators.maxLength(255),
                    ],
                },
            ],
        });
    }

    public ngAfterViewInit(): void {
        this._subscriptions.add(
            this._aceService
                .getAceEditor$(this.editorElementRef.nativeElement)
                .subscribe((aceEditor) => {
                    this._aceEditor = aceEditor;
                    this._aceEditor.session.setValue('Write your code here');
                    this._aceEditor.on('change', () => {
                        this._cdr.detectChanges();
                    });
                    this._cdr.detectChanges();
                })
        );
    }

    public ngOnInit(): void {
        this._initForm();
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onSubmit(): void {
        this._maskService.show();
        const language = <SnippetLanguage>this.selectedLanguage;
        const snippet: Partial<Snippet> = {
            srcRaw: this._code,
            language,
            extension: SnippetExtensionsEnum[language],
            name: this.formGroup.controls['name'].value,
        };
        this._snippetsService.create(snippet).subscribe({
            next: () => {
                this._maskService.hide();
                this.activeModal.close('Success');
                const toast: Toast = {
                    textOrTemplate: `Snippet ${snippet.name}.${snippet.extension} successfully saved`,
                };
                this._toastService.showSuccess(toast);
            },
            error: (e) => {
                this._maskService.hide();
                console.error(e);
                const toast: Toast = {
                    textOrTemplate: `Unable to save snippet ${snippet.name}.${snippet.extension}`,
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
