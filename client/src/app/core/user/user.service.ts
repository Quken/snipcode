import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, ReplaySubject, shareReplay } from 'rxjs';
import { User } from './models';

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
    private _userSubject: ReplaySubject<User> = new ReplaySubject(1);
    public user$: Observable<User> = this._userSubject.asObservable();

    constructor() {}

    public login(email: string, password: string): Observable<void> {
        return new Observable((observer) => {
            setTimeout(() => {
                if (email === userMock.email && password === 'usermock') {
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

    // TODO: DTO
    public register(payload: Partial<User>): Observable<void> {
        return new Observable((observer) => {
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
}
