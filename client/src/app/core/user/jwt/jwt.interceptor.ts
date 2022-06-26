import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../models';
import { ApiService } from '@core/api';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private readonly _userService: UserService) {}

    private _setToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
        const token = localStorage.getItem('token');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
        return request;
    }

    public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        if (
            request.url.includes('auth/login') ||
            request.url.includes('auth/refresh')
        ) {
            return next.handle(request);
        }
        return this._userService.user$.pipe(
            map((user: User | null) => {
                if (user) {
                    return this._setToken(request);
                }
                return request;
            }),
            switchMap((request) => {
                return next.handle(request).pipe(
                    catchError((e) => {
                        if (
                            e.status === 401 &&
                            request.headers.get('Authorization')
                        ) {
                            return this._userService.refresh().pipe(
                                switchMap(() => {
                                    request = this._setToken(request);
                                    return next.handle(request);
                                })
                            );
                        }
                        return throwError(() => e);
                    })
                );
            })
        );
    }
}
