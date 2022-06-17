import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/api';
import { AUTH_CRYPTO_KEY, CryptoService } from '@core/crypto';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import {
    LoginDTO,
    LoginResponse,
    LogoutResponse,
    RefreshResponse,
    RegistrationDTO,
    RegistrationResponse,
    User,
} from './models';

const userMock = new User({
    id: '1',
    email: 'login@email.com',
    name: 'John',
    surname: 'Doe',
    age: 29,
    position: 'Software Engineer',
    summary: 'Hi Im software engineer',
});

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private _userSubject: BehaviorSubject<User | null> =
        new BehaviorSubject<User | null>(null);
    public user$: Observable<User | null> = this._userSubject.asObservable();

    constructor(
        private readonly _cryptoService: CryptoService,
        private readonly _httpClient: HttpClient
    ) {
        const token = localStorage.getItem('token');
        if (token) {
            this._verifyUser();
        }
    }

    private _verifyUser(): void {
        const refreshUrl = `${ApiService.auth}/refresh`;
        this._httpClient
            .get<RefreshResponse>(refreshUrl, { withCredentials: true })
            .subscribe({
                next: (response: RefreshResponse) => {
                    localStorage.setItem('token', response.accessToken);
                    this._userSubject.next(response.user as User);
                },
                error: (e) => {
                    console.log(e);
                },
            });
    }

    public login(payload: LoginDTO): Observable<void> {
        const url = `${ApiService.auth}/login`;
        return this._httpClient
            .post<LoginResponse>(url, payload, { withCredentials: true })
            .pipe(
                map((response: LoginResponse) => {
                    localStorage.setItem('token', response.accessToken);
                    this._userSubject.next(response.user as User);
                    return void 0;
                })
            );
    }

    public register(payload: RegistrationDTO): Observable<void> {
        const encrypted = {
            ...payload,
            password: this._cryptoService.encrypt(
                payload.password,
                AUTH_CRYPTO_KEY
            ),
        };
        const url = `${ApiService.auth}/register`;
        return this._httpClient.post<RegistrationResponse>(url, encrypted).pipe(
            map((response: RegistrationResponse) => {
                localStorage.setItem('token', response.accessToken);
                this._userSubject.next(response.user as User);
                return void 0;
            })
        );
    }

    public logout(): Observable<void> {
        const url = `${ApiService.auth}/logout`;
        return this._httpClient
            .post<LogoutResponse>(url, null, {
                withCredentials: true,
            })
            .pipe(
                map(() => {
                    this._userSubject.next(null);
                    localStorage.removeItem('token');
                    return void 0;
                })
            );
    }
}
