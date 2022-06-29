import { Injectable } from '@angular/core';
import { GUID } from '@shared/models';
import {
    BehaviorSubject,
    filter,
    forkJoin,
    map,
    Observable,
    of,
    shareReplay,
    switchMap,
    tap,
    take,
} from 'rxjs';
import { CreateSnippetDTO, DateUTC, Snippet, UpdateSnippetDTO } from './models';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '@core/user';
import { ApiService } from '@core/api';

@Injectable({
    providedIn: 'root',
})
export class SnippetsService {
    private readonly _userSnippetsSubject: BehaviorSubject<Snippet[] | null> =
        new BehaviorSubject<Snippet[] | null>(null);
    private readonly _allSnippetsSubject: BehaviorSubject<Snippet[] | null> =
        new BehaviorSubject<Snippet[] | null>(null);

    public userSnippets$ = this._userSnippetsSubject.asObservable();
    public allSnippets$ = this._allSnippetsSubject.asObservable();

    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _userService: UserService
    ) {}

    public getByUserId(userId: GUID): Observable<Snippet[]> {
        return this.allSnippets$.pipe(
            switchMap((snippets) => {
                if (snippets?.length) {
                    return of(
                        snippets.filter((s) => s.createdBy.id === userId)
                    );
                }
                const url = `${ApiService.snippet}/userid/${userId}`;
                return this._httpClient
                    .get<Snippet[]>(url, {
                        withCredentials: true,
                    })
                    .pipe(
                        map((response) => {
                            return response.map((item) => {
                                return new Snippet(item);
                            });
                        }),
                        tap((snippets: Snippet[]) =>
                            this._userSnippetsSubject.next(snippets)
                        )
                    );
            })
        );
    }

    public getAll(): Observable<Snippet[]> {
        const url = `${ApiService.snippet}`;
        return this._httpClient.get<Snippet[]>(url).pipe(
            map((response) => response.map((item) => new Snippet(item))),
            tap((snippets) => {
                this._allSnippetsSubject.next(snippets);
            })
        );
    }

    public create(
        snippet: Omit<CreateSnippetDTO, 'createdAt' | 'createdByUserId'>
    ): Observable<void> {
        const url = ApiService.snippet;
        const create$ = this._userService.user$.pipe(
            filter(Boolean),
            switchMap((user: User) => {
                const snippetDTO: CreateSnippetDTO = {
                    ...snippet,
                    createdByUserId: user.id,
                };
                return this._httpClient
                    .post<Snippet>(url, snippetDTO, {
                        withCredentials: true,
                    })
                    .pipe(map((response) => new Snippet(response)));
            }),
            shareReplay(1)
        );

        forkJoin({
            allSnippets: this.allSnippets$.pipe(filter(Boolean), take(1)),
            newSnippet: create$.pipe(take(1)),
        }).subscribe({
            next: ({ allSnippets, newSnippet }) =>
                this._allSnippetsSubject.next([...allSnippets, newSnippet]),
        });

        forkJoin({
            userSnippets: this.userSnippets$.pipe(filter(Boolean), take(1)),
            newSnippet: create$.pipe(take(1)),
        }).subscribe({
            next: ({ userSnippets, newSnippet }) =>
                this._userSnippetsSubject.next([...userSnippets, newSnippet]),
        });
        return create$.pipe(map(() => void 0));
    }

    public update(snippet: Omit<UpdateSnippetDTO, 'userId'>): Observable<void> {
        const url = `${ApiService.snippet}/${snippet.id}`;
        const update$ = this._userService.user$.pipe(
            filter(Boolean),
            switchMap((user: User) => {
                const snippetDTO: UpdateSnippetDTO = {
                    ...snippet,
                    userId: user.id,
                };
                if (!snippet?.likedBy?.length) {
                    snippetDTO.modifiedAt = <DateUTC>new Date().toUTCString();
                }
                return this._httpClient
                    .post<Snippet>(url, snippetDTO, {
                        withCredentials: true,
                    })
                    .pipe(map((response) => new Snippet(response)));
            }),
            shareReplay(1)
        );

        forkJoin({
            allSnippets: this.allSnippets$.pipe(filter(Boolean), take(1)),
            snippetDiff: update$.pipe(take(1)),
        }).subscribe({
            next: ({ allSnippets, snippetDiff }) => {
                let snippet = allSnippets?.find(
                    (snippet) => snippet.id === snippetDiff.id
                ) as Snippet;
                if (snippet) {
                    snippet = snippet.merge(snippetDiff);
                }
                this._allSnippetsSubject.next([...allSnippets]);
            },
        });

        forkJoin({
            userSnippets: this.userSnippets$.pipe(filter(Boolean), take(1)),
            snippetDiff: update$.pipe(take(1)),
        }).subscribe({
            next: ({ userSnippets, snippetDiff }) => {
                let snippet = userSnippets?.find(
                    (snippet) => snippet.id === snippetDiff.id
                ) as Snippet;
                if (snippet) {
                    snippet = snippet.merge(snippetDiff);
                }
                this._userSnippetsSubject.next([...userSnippets]);
            },
        });
        return update$.pipe(map(() => void 0));
    }
}
