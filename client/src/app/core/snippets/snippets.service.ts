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
import { SnippetExtensionsEnum } from './enums';
import { ApiService } from '@core/api';

const snippetsMock: Snippet[] = [
    new Snippet({
        id: '1',
        name: 'MyCssSnippet',
        language: 'css',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            email: 'johndoe@email.com',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'p { color: red }',
        likedBy: [],
        extension: SnippetExtensionsEnum.css,
    }),
    new Snippet({
        id: '2',
        name: 'MyTypescriptSnippet',
        language: 'typescript',
        extension: SnippetExtensionsEnum.typescript,
        createdBy: {
            id: '1',
            name: 'John',
            email: 'johndoe@email.com',
            surname: 'Doe',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'export type GUID = string',
        likedBy: [
            {
                id: '2',
                name: 'Travis',
                surname: 'Scott',
            },
        ],
    }),
    new Snippet({
        id: '3',
        name: 'MyJavascriptSnippet',
        language: 'javascript',
        createdBy: {
            id: '2',
            name: 'Travis',
            email: 'travis@email.com',
            surname: 'Scott',
            summary: 'Software engineer',
        },
        extension: SnippetExtensionsEnum.javascript,
        createdAt: new Date().toUTCString(),
        srcRaw: `
function debounce(fn, delay) {
	let timeout;

	return function (...args) {
		clearTimeout(timeout);

		timeout = setTimeout(() => {
			clearTimeout(timeout);
			fn.apply(this, ...args);
		}, delay);
	};
}`,
        likedBy: [
            {
                id: '1',
                name: 'John',
                surname: 'Doe',
            },
        ],
    }),
    new Snippet({
        id: '4',
        name: 'MySecondJavascriptSnippet',
        language: 'javascript',
        createdBy: {
            id: '2',
            email: 'travis@email.com',
            name: 'Travis',
            surname: 'Scott',
            summary: 'Software engineer',
        },
        extension: SnippetExtensionsEnum.javascript,
        createdAt: new Date().toUTCString(),
        srcRaw: `console.log(4)`,
        likedBy: [
            {
                id: '1',
                name: 'John',
                surname: 'Doe',
            },
        ],
    }),
];

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
                        ),
                        tap(console.log)
                    );
            })
        );
    }

    public getAll(): Observable<Snippet[]> {
        const url = `${ApiService.snippet}`;
        return this.allSnippets$.pipe(
            map((allSnippets: Snippet[] | null) => {
                if (!allSnippets) {
                    this._allSnippetsSubject.next(snippetsMock);
                    return snippetsMock;
                }
                return allSnippets;
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
                return this._httpClient.post<Snippet>(url, snippetDTO, {
                    withCredentials: true,
                });
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
                // const body = { snippet: snippetDTO, user };
                // console.log(body);

                return this._httpClient.post<Snippet>(url, snippetDTO, {
                    withCredentials: true,
                });
                // http here
                // TODO: return updated snippet from server and use here
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
