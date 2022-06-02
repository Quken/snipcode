import { Injectable } from '@angular/core';
import { userSettingsMock } from '@mocks/user';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { User, UserSettings } from '../models';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    public settings$: Observable<UserSettings> | null = null;

    constructor(private readonly _userService: UserService) {}

    public getCurrent(): Observable<UserSettings> {
        this.settings$ = this._userService.user$.pipe(
            map((user: User) => {
                console.log(user);
                return userSettingsMock;
            }),
            shareReplay(1)
        );
        return this.settings$;
    }
}
