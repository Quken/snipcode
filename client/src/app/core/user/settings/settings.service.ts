import { Injectable } from '@angular/core';
import { userSettingsMock } from '@mocks/user';
import { map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { User, UserSettings } from '../models';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class UserSettingsService {
    private _settings$: Observable<UserSettings> | null = null;

    constructor(private readonly _userService: UserService) {}

    public getCurrentSettings(): Observable<UserSettings> {
        this._settings$ = this._userService.user$.pipe(
            map((user: User) => {
                return userSettingsMock;
            }),
            shareReplay(1)
        );
        return this._settings$;
    }
}
