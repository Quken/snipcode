import { Injectable } from '@angular/core';
import { GUID } from '@shared/models';
import { Observable, of, shareReplay } from 'rxjs';
import { SnippetExtensionsEnum } from './enums/snippets-extensions.enum';
import { Snippet } from './models';

const snippetsMock: Snippet[] = [
    new Snippet({
        id: '1',
        name: '1',
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
        name: '2',
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
        name: '3',
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
        name: '4',
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
    public getSnippets(userId: GUID): Observable<Snippet[]> {
        return of(snippetsMock).pipe(shareReplay(1));
    }
}
