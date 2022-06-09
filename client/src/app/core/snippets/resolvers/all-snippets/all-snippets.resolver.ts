import { Injectable } from '@angular/core';
import {
    Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot,
} from '@angular/router';
import { Snippet } from '@core/snippets';
import { SnippetsService } from '@core/snippets/snippets.service';
import { filter, firstValueFrom, Observable, take, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AllSnippetsResolver implements Resolve<Snippet[]> {
    constructor(private readonly _snippetsService: SnippetsService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Snippet[]> {
        return this._snippetsService.getAll().pipe(take(1));
    }
}
