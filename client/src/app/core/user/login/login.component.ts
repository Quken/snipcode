import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
    public formGroup!: FormGroup;

    constructor(
        private readonly _userService: UserService,
        private readonly _fb: FormBuilder
    ) {}

    public ngOnInit(): void {
        // async validators
        this.formGroup = this._fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    public ngOnDestroy(): void {}
}
