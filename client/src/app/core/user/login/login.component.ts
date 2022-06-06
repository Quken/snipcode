import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { isControlInvalid } from '@core/form';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    private _returnUrl!: string;

    public formGroup!: FormGroup;
    public isControlInvalid = isControlInvalid;
    public loginError?: string;
    public logging: boolean = false;

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
            password: ['', [Validators.required]],
        });
        this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }

    public onSubmit(): void {
        this.logging = true;
        const { email, password } = this.formGroup.value;
        this._userService.login(email, password).subscribe({
            next: () => {
                this.logging = false;
                this._router.navigate([this._returnUrl]);
                this._cdr.detectChanges();
            },
            error: (e) => {
                this.loginError = e.message;
                this.logging = false;
                this._cdr.detectChanges();
            },
        });
    }

    public onRegister(): void {
        this._router.navigate(['/register']);
    }
}
