import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpClient,
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../models';
import { ApiService } from '@core/api';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(
        private readonly _userService: UserService,
        private readonly _httpClient: HttpClient
    ) {}

    public intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return this._userService.user$.pipe(
            map((user: User | null) => {
                const token = localStorage.getItem('token');
                if (user && token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
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
                            const refreshUrl = `${ApiService.auth}/refresh`;
                            return this._httpClient
                                .get(refreshUrl, { withCredentials: true })
                                .pipe(
                                    switchMap((response) => {
                                        localStorage.setItem(
                                            'token',
                                            (response as any)['accessToken']
                                        );
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
