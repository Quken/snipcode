import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH_CRYPTO_KEY, CryptoService } from '@core/crypto';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginDTO, RegistrationDTO, User } from './models';

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

    constructor(private readonly _cryptoService: CryptoService) {}

    public login({ email, password }: LoginDTO): Observable<void> {
        return new Observable((observer) => {
            setTimeout(() => {
                if (email === userMock.email && password === 'usermock') {
                    const payload = {
                        email,
                        password: this._cryptoService.encrypt(
                            password,
                            AUTH_CRYPTO_KEY
                        ),
                    };
                    this._userSubject.next(userMock);
                    observer.next();
                    observer.complete();
                }
                observer.error(
                    new Error(
                        'Error during login. Please double-check your credentials or try again later.'
                    )
                );
                observer.complete();
            }, 4000);
        });
    }

    public register(payload: RegistrationDTO): Observable<void> {
        return new Observable((observer) => {
            const encrypted = {
                ...payload,
                password: this._cryptoService.encrypt(
                    payload.password,
                    AUTH_CRYPTO_KEY
                ),
            };
            setTimeout(() => {
                if (payload.email === userMock.email + '1') {
                    const error = new HttpErrorResponse({
                        error: {
                            message: `Oops. User with such email already exists`,
                        },
                        status: 409,
                    });
                    observer.error(error);
                    return;
                }
                observer.next();
                observer.complete();
            }, 4000);
        });
    }

    public logout(): Observable<void> {
        return new Observable((observer) => {
            setTimeout(() => {
                this._userSubject.next(null);
                observer.next();
                observer.complete();
            }, 4000);
        });
    }
}
