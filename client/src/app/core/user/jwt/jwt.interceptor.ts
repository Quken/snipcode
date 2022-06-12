import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../models';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private readonly _userService: UserService) {}

    public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this._userService.user$.pipe(
            map((user: User | null) => {
                if (user && user.token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${user.token}`,
                        },
                    });
                }
                return request;
            }),
            switchMap(next.handle)
        );
    }
}
