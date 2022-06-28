import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/api';
import { CryptoService } from '@core/crypto';
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
    ) {}

    public verifyUser(): void {
        const sub = this.refresh().subscribe({
            next: (response: RefreshResponse) => {
                this._userSubject.next(response.user as User);
                sub.unsubscribe();
            },
            error: (e) => {
                console.log(e);
                sub.unsubscribe();
            },
        });
    }

    public login(payload: LoginDTO): Observable<void> {
        const url = `${ApiService.auth}/login`;
        const hashed = {
            ...payload,
            password: this._cryptoService.hash(payload.password),
        };
        return this._httpClient
            .post<LoginResponse>(url, hashed, { withCredentials: true })
            .pipe(
                map((response: LoginResponse) => {
                    localStorage.setItem('token', response.accessToken);
                    this._userSubject.next(response.user as User);
                    return void 0;
                })
            );
    }

    public register(payload: RegistrationDTO): Observable<void> {
        const hashed = {
            ...payload,
            password: this._cryptoService.hash(payload.password),
        };
        const url = `${ApiService.auth}/register`;
        return this._httpClient
            .post<RegistrationResponse>(url, hashed, {
                withCredentials: true,
            })
            .pipe(
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

    public refresh(): Observable<RefreshResponse> {
        const refreshUrl = `${ApiService.auth}/refresh`;
        return this._httpClient
            .get<RefreshResponse>(refreshUrl, {
                withCredentials: true,
            })
            .pipe(
                tap((response: RefreshResponse) => {
                    localStorage.setItem('token', response.accessToken);
                })
            );
    }
}
