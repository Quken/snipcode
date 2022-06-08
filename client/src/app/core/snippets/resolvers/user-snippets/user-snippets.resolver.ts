import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Snippet } from '@core/snippets';
import { SnippetsService } from '@core/snippets/snippets.service';
import { UserService } from '@core/user';
import { Observable, of, switchMap, take } from 'rxjs';

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
            take(1),
            switchMap((user) => this._snippetsService.getById(user.id))
        );
    }
}
