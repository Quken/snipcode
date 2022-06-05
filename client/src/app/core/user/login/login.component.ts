import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
    public formGroup!: FormGroup;
    public loginError?: string;
    public logging: boolean = false;

    public get isLoginInvalid(): boolean {
        return (
            this.formGroup.controls['email'].invalid &&
            (this.formGroup.controls['email'].dirty ||
                this.formGroup.controls['email'].touched)
        );
    }

    public get isPasswordInValid(): boolean {
        return (
            this.formGroup.controls['password'].invalid &&
            (this.formGroup.controls['password'].dirty ||
                this.formGroup.controls['password'].touched)
        );
    }

    constructor(
        private readonly _userService: UserService,
        private readonly _fb: FormBuilder,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this.formGroup = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    public onSubmit(): void {
        this.logging = true;
        const { email, password } = this.formGroup.value;
        this._userService.login(email, password).subscribe({
            next: () => {
                console.log('Logged in');
                this.logging = false;
                this._cdr.detectChanges();
            },
            error: (e) => {
                this.loginError = e.message;
                this.logging = false;
                this._cdr.detectChanges();
            },
        });
        console.log(this.formGroup.value);
    }

    public ngOnDestroy(): void {}
}
