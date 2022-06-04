import { Injectable } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { User } from './models';

const userMock = new User({
    id: '1',
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
    public user$: Observable<User> = of(userMock).pipe(shareReplay(1));

    constructor() {}
}
