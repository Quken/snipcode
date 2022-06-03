import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AceEditorFontFamilies, AceEditorThemes } from '@core/ace/enum';
import { AceEditorSettings } from '@core/ace/model';
import { UserSettings, UserSettingsService } from '@core/user';
import { EditorSettingsService } from '@core/user/editor-settings';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
    private readonly _subscriptions: Subscription = new Subscription();
    private _userSettings: UserSettings | null = null;

    public formGroup!: FormGroup;

    public get isDisabled(): boolean {
        return !this.hasDiff || !this.formGroup.valid;
    }

    public get hasDiff(): boolean {
        if (!this._userSettings) {
            return false;
        }
        const {
            theme = AceEditorThemes.Dark,
            fontSize = 14,
            fontFamily = 'Roboto Mono',
        } = <AceEditorSettings>this._userSettings?.aceEditor;
        const newTheme = this.formGroup.get(['editor', 'theme'])?.value;
        const newFontSize = this.formGroup.get(['editor', 'fontSize'])?.value;
        const newFontFamily = this.formGroup.get([
            'editor',
            'fontFamily',
        ])?.value;

        return (
            theme !== newTheme ||
            fontSize !== newFontSize ||
            fontFamily !== newFontFamily
        );
    }

    public get editorSettings(): {
        themes: string[];
        fontFamilies: string[];
    } {
        return {
            themes: Object.values(AceEditorThemes),
            fontFamilies: Object.values(AceEditorFontFamilies),
        };
    }

    constructor(
        private readonly _userSettingsService: UserSettingsService,
        private readonly _fb: FormBuilder,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _editorSettingsService: EditorSettingsService
    ) {}

    private _initForm(): void {
        this.formGroup = this._fb.group({
            editor: this._fb.group({
                theme: [null, Validators.required],
                fontSize: [
                    null,
                    [
                        Validators.required,
                        Validators.min(8),
                        Validators.max(64),
                    ],
                ],
                fontFamily: [null, [Validators.required]],
            }),
        });
    }

    private _setFormValues(): void {
        const {
            theme = AceEditorThemes.Dark,
            fontSize = 14,
            fontFamily = 'Roboto Mono',
        } = <AceEditorSettings>this._userSettings?.aceEditor;

        this.formGroup.setValue({
            editor: {
                theme,
                fontSize,
                fontFamily,
            },
        });
    }

    private _getEditorUpdates(): Partial<AceEditorSettings> {
        const newTheme = this.formGroup.get(['editor', 'theme'])?.value;
        const newFontSize = this.formGroup.get(['editor', 'fontSize'])?.value;
        const newFontFamily = this.formGroup.get([
            'editor',
            'fontFamily',
        ])?.value;
        const { theme, fontSize, fontFamily } = <AceEditorSettings>(
            this._userSettings?.aceEditor
        );
        const editorUpdates: Partial<AceEditorSettings> = {};
        if (newTheme !== theme) {
            editorUpdates.theme = newTheme;
        }
        if (newFontSize !== fontSize) {
            editorUpdates.fontSize = newFontSize;
        }
        if (newFontFamily !== fontFamily) {
            editorUpdates.fontFamily = newFontFamily;
        }
        return editorUpdates;
    }

    public ngOnInit(): void {
        this._initForm();
        this._subscriptions.add(
            this._userSettingsService.settings$.subscribe({
                next: (settings) => {
                    console.log(settings);
                    this._userSettings = settings;
                    this._setFormValues();
                    this._cdr.detectChanges();
                },
            })
        );
    }

    public onSubmit(): void {
        const newEditorSettings = this._getEditorUpdates();
        if (Object.keys(newEditorSettings).length) {
            this._editorSettingsService.update(newEditorSettings).subscribe({
                next: () => {
                    console.log('updated');
                },
            });
        }
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public onThemeSelect(theme: string) {
        this.formGroup.get(['editor', 'theme'])?.setValue(theme);
    }

    public onFontFamilySelect(fontFamily: string) {
        this.formGroup.get(['editor', 'fontFamily'])?.setValue(fontFamily);
    }
}