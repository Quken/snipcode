import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit {
    public formGroup!: FormGroup;
    public loginError?: string;
    public loading: boolean = false;

    public passwordsAreSame: boolean = true;

    public get isPasswordInvalid(): boolean {
        return (
            this.formGroup.controls['password'].invalid &&
            (this.formGroup.controls['password'].dirty ||
                this.formGroup.controls['password'].touched)
        );
    }

    public get isPasswordConfirmationInvalid(): boolean {
        return (
            !this.passwordsAreSame &&
            (this.formGroup.controls['passwordConfirmation'].dirty ||
                this.formGroup.controls['passwordConfirmation'].touched) &&
            (this.formGroup.controls['password'].dirty ||
                this.formGroup.controls['password'].touched)
        );
    }

    public get isEmailInvalid(): boolean {
        return (
            this.formGroup.controls['email'].invalid &&
            (this.formGroup.controls['email'].dirty ||
                this.formGroup.controls['email'].touched)
        );
    }

    public get isDisabled(): boolean {
        return this.formGroup.invalid || this.loading || !this.passwordsAreSame;
    }

    constructor(
        private readonly _userService: UserService,
        private readonly _fb: FormBuilder,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {}

    public ngOnInit(): void {
        this.formGroup = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            name: ['', [Validators.required]],
            surname: ['', [Validators.required]],
            summary: ['', [Validators.required]],
            age: ['', [Validators.min(0), Validators.max(100)]],
            position: [''],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirmation: [''],
        });
        this.formGroup.get('password')?.valueChanges.subscribe({
            next: (v) => {
                this.passwordsAreSame =
                    v === this.formGroup.get('passwordConfirmation')?.value;
                this._cdr.detectChanges();
            },
        });
        this.formGroup.get('passwordConfirmation')?.valueChanges.subscribe({
            next: (v) => {
                this.passwordsAreSame =
                    v === this.formGroup.get('password')?.value;
                this._cdr.detectChanges();
            },
        });
    }

    public onSubmit(): void {
        //after registration redirect to homepsge
        // this.logging = true;
        // const { email, password } = this.formGroup.value;
        // this._userService.login(email, password).subscribe({
        //     next: () => {
        //         this.logging = false;
        //         this._router.navigate([this._returnUrl]);
        //         this._cdr.detectChanges();
        //     },
        //     error: (e) => {
        //         this.loginError = e.message;
        //         this.logging = false;
        //         this._cdr.detectChanges();
        //     },
        // });
    }
}
