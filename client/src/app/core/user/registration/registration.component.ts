import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { isNumber } from 'lodash';
import { catchError, Subscription, switchMap } from 'rxjs';
import { isControlInvalid } from '../../form';
import { User } from '../models';
import { UserService } from '../user.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent implements OnInit, OnDestroy {
    private readonly _subscriptions: Subscription = new Subscription();

    public formGroup!: FormGroup;
    public loginError?: string;
    public loading: boolean = false;
    public isControlInvalid = isControlInvalid;
    public passwordsAreSame: boolean = true;

    public get isPasswordConfirmationInvalid(): boolean {
        return (
            !this.passwordsAreSame &&
            (this.formGroup.controls['passwordConfirmation'].dirty ||
                this.formGroup.controls['passwordConfirmation'].touched) &&
            (this.formGroup.controls['password'].dirty ||
                this.formGroup.controls['password'].touched)
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

    private initForm(): void {
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
        this._subscriptions.add(
            this.formGroup.get('password')?.valueChanges.subscribe({
                next: (v) => {
                    this.passwordsAreSame =
                        v === this.formGroup.get('passwordConfirmation')?.value;
                    this._cdr.detectChanges();
                },
            })
        );
        this._subscriptions.add(
            this.formGroup.get('passwordConfirmation')?.valueChanges.subscribe({
                next: (v) => {
                    this.passwordsAreSame =
                        v === this.formGroup.get('password')?.value;
                    this._cdr.detectChanges();
                },
            })
        );
    }

    public ngOnInit(): void {
        this.initForm();
    }

    public onSubmit(): void {
        if (this.formGroup.invalid) {
            return;
        }
        this.loading = true;

        const { email, name, surname, summary, age, position, password } =
            this.formGroup.value;

        // TODO: DTO
        const payload: Partial<User> & { password: string } = {
            email,
            name,
            surname,
            summary,
            password,
        };
        if (isNumber(age)) {
            payload.age = age;
        }
        if (position) {
            payload.position = position;
        }
        this._subscriptions.add(
            this._userService
                .register(payload)
                .pipe(
                    switchMap(() =>
                        this._userService.login(
                            (payload as User).email,
                            payload.password
                        )
                    ),
                    catchError((e) => {
                        console.log(e);
                        return e;
                    })
                )
                .subscribe({
                    next: () => {
                        this.loading = false;
                        this._router.navigate(['/']);
                    },
                    error: (e) => {
                        this.loading = false;
                        // TODO: show alert
                        console.error(e);
                    },
                })
        );
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
