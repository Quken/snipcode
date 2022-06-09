import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { buffer, Observable, of, switchMap, take, timer } from 'rxjs';
import { User } from '../models';
import { UserService } from '../user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
        private readonly _userService: UserService,
        private readonly _router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._userService.user$.pipe(
            switchMap((user: User | null) => {
                if (!user) {
                    this._router.navigate(['/login'], {
                        queryParams: { returnUrl: state.url },
                    });
                    return of(false);
                }
                return of(true);
            })
        );
    }
}
