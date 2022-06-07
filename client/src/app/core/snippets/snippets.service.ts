import { Injectable } from '@angular/core';
import { GUID } from '@shared/models';
import {
    forkJoin,
    map,
    Observable,
    of,
    ReplaySubject,
    switchMap,
    take,
} from 'rxjs';
import { SnippetExtensionsEnum } from './enums/snippets-extensions.enum';
import { DateUTC, Snippet } from './models';
import { HttpClient } from '@angular/common/http';
import { User, UserService } from '@core/user';

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
    private readonly _userSnippetsSubject: ReplaySubject<Snippet[]> =
        new ReplaySubject(1);
    private readonly _allSnippetsSubject: ReplaySubject<Snippet[]> =
        new ReplaySubject(1);

    public userSnippets$ = this._userSnippetsSubject.asObservable();
    public allSnippets$ = this._allSnippetsSubject.asObservable();

    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _userService: UserService
    ) {}

    public getById(userId: GUID): void {
        of(snippetsMock.filter((s) => s.createdBy.id === userId)).subscribe(
            (snippets) => this._userSnippetsSubject.next(snippets)
        );
    }

    // move to ngDoBootstrap ?
    public getAll(): void {
        of(snippetsMock).subscribe((snippets) =>
            this._allSnippetsSubject.next(snippets)
        );
    }

    public create(snippet: Partial<Snippet>): Observable<void> {
        return this._userService.user$.pipe(
            switchMap((user: User) => {
                const snippetDTO: Partial<Snippet> = {
                    ...snippet,
                    createdAt: <DateUTC>new Date().toUTCString(),
                    createdBy: user,
                };
                const body = { snippet: snippetDTO, user };
                console.log(body);
                return of(null);
            }),
            map(() => void 0)
        );
    }

    public update(snippet: Partial<Snippet>): Observable<void> {
        const update$ = this._userService.user$.pipe(
            switchMap((user: User) => {
                const snippetDTO: Partial<Snippet> = {
                    ...snippet,
                };
                if (!snippet?.likedBy?.length) {
                    snippetDTO.modifiedAt = <DateUTC>new Date().toUTCString();
                }
                const body = { snippet: snippetDTO, user };
                // TODO: 3 times during update
                console.log(body);
                // http here
                return of(snippetDTO as Snippet);
            })
        );

        forkJoin({
            allSnippets: this.allSnippets$.pipe(take(1)),
            snippetDiff: update$,
        }).subscribe({
            next: ({ allSnippets, snippetDiff }) => {
                let snippet = allSnippets.find(
                    (snippet) => snippet.id === snippetDiff.id
                ) as Snippet;
                if (snippet) {
                    snippet = snippet.merge(snippetDiff);
                }
            },
        });

        forkJoin({
            userSnippets: this.userSnippets$.pipe(take(1)),
            snippetDiff: update$,
        }).subscribe({
            next: ({ userSnippets, snippetDiff }) => {
                let snippet = userSnippets.find(
                    (snippet) => snippet.id === snippetDiff.id
                ) as Snippet;
                if (snippet) {
                    snippet = snippet.merge(snippetDiff);
                }
            },
        });
        return update$.pipe(map(() => void 0));
    }
}
