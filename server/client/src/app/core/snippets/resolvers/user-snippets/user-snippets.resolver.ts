import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Snippet } from '@core/snippets';
import { SnippetsService } from '@core/snippets/snippets.service';
import { User, UserService } from '@core/user';
import { filter, Observable, switchMap, take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UserSnippetsResolver implements Resolve<Snippet[]> {
    constructor(
        private readonly _snippetsService: SnippetsService,
        private readonly _userService: UserService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Snippet[]> {
        return this._userService.user$.pipe(
            filter(Boolean),
            take(1),
            switchMap((user: User) =>
                this._snippetsService.getByUserId(user.id).pipe(take(1))
            )
        );
    }
}
