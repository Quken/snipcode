import { Injectable } from '@angular/core';
import { GUID } from '@shared/models';
import {
    EMPTY,
    mapTo,
    Observable,
    of,
    shareReplay,
    switchMap,
    tap,
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
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'p { color: red }',
        likes: 0,
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
            surname: 'Doe',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'export type GUID = string',
        likes: 2,
    }),
    new Snippet({
        id: '3',
        name: 'MyJavascriptSnippet',
        language: 'javascript',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
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
        likes: 3,
    }),
    new Snippet({
        id: '4',
        name: 'MySecondJavascriptSnippet',
        language: 'javascript',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            summary: 'Software engineer',
        },
        extension: SnippetExtensionsEnum.javascript,
        createdAt: new Date().toUTCString(),
        srcRaw: `console.log(4)`,
        likes: 4,
    }),
];

@Injectable({
    providedIn: 'root',
})
export class SnippetsService {
    constructor(
        private readonly _httpClient: HttpClient,
        private readonly _userService: UserService
    ) {}

    public getById(userId: GUID): Observable<Snippet[]> {
        return of(snippetsMock)
    }

    public getAll(): Observable<Snippet[]> {
        return of(snippetsMock)
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
            mapTo(void 0)
        );
    }

    public update(snippet: Partial<Snippet>): Observable<void> {
        return this._userService.user$.pipe(
            switchMap((user: User) => {
                const snippetDTO: Partial<Snippet> = {
                    ...snippet,
                    modifiedAt: <DateUTC>new Date().toUTCString(),
                };
                const body = { snippet: snippetDTO, user };
                console.log(body);
                return of(null);
            }),
            mapTo(void 0)
        );
    }
}
