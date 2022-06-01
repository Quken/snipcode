import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AceService } from '@core/ace';
import { Snippet, SnippetsService } from '@core/snippets';
import { Toast } from '@core/toast/models';
import { ToastService } from '@core/toast/toast.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as ace from 'ace-builds';

@Component({
    selector: 'app-snippet-modal',
    templateUrl: './snippet-modal.component.html',
    styleUrls: ['./snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetModalComponent implements OnInit, AfterViewInit {
    @ViewChild('editor', { static: true })
    public editorElementRef!: ElementRef<HTMLElement>;
    @Input()
    public snippet!: Snippet;
    public isEdit: boolean = false;
    public formGroup!: FormGroup;

    private _aceEditor!: ace.Ace.Editor;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _aceService: AceService,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _snippetsService: SnippetsService,
        private readonly _toastService: ToastService,
        private readonly _formBuilder: FormBuilder
    ) {}

    public get isNameInvalid(): boolean {
        return (
            this.formGroup.controls['name'].invalid &&
            (this.formGroup.controls['name'].dirty ||
                this.formGroup.controls['name'].touched)
        );
    }

    public get hasDiff(): boolean {
        return (
            this._aceEditor?.getValue() !== this.snippet.srcRaw ||
            this.snippet.name !== this.formGroup.controls['name'].value
        );
    }

    public get snippetFullName(): string {
        return `Snippet "${this.snippet.fullSnippetName}"`;
    }

    public get isDisabled(): boolean {
        return !this._aceEditor?.getValue().length || !this.formGroup.valid;
    }

    private _initForm(): void {
        this.formGroup = this._formBuilder.group({
            name: [
                this.snippet.name,
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

    public ngOnInit(): void {
        this._initForm();
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

    public onSubmit(): void {
        const isNameChanged =
            this.snippet.name !== this.formGroup.controls['name'].value;
        const isCodeChanged =
            this._aceEditor?.getValue() !== this.snippet.srcRaw;
        const snippet: Partial<Snippet> = {
            id: this.snippet.id,
        };
        if (isNameChanged) {
            snippet.name = this.formGroup.controls['name'].value;
        }
        if (isCodeChanged) {
            snippet.srcRaw = this._aceEditor?.getValue();
        }
        this._snippetsService.update(snippet).subscribe({
            next: () => {
                this.activeModal.close('Success');
                const toast: Toast = {
                    textOrTemplate: `Snippet ${snippet.name}.${this.snippet.extension} successfully updated`,
                };
                this._toastService.showSuccess(toast);
            },
            error: (e) => {
                console.error(e);
                const toast: Toast = {
                    textOrTemplate: `Unable to update snippet ${snippet.name}.${this.snippet.extension}`,
                };
                this._toastService.showDanger(toast);
            },
        });
    }
}
