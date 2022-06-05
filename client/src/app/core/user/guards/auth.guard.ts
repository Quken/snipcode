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
            buffer(timer(0)),
            take(1),
            switchMap((user: User[]) => {
                console.log(user);
                if (!user.length) {
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
