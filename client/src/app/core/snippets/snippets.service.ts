import { Injectable } from '@angular/core';
import { GUID } from '@shared/models';
import { Observable, of, shareReplay } from 'rxjs';
import { Snippet } from './models';

const snippetsMock: Snippet[] = [
    {
        id: '1',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'console.log(1)',
        likes: 0,
    },
    {
        id: '2',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'console.log(2)',
        likes: 2,
    },
    {
        id: '3',
        createdBy: {
            id: '1',
            name: 'John',
            surname: 'Doe',
            summary: 'Software engineer',
        },
        createdAt: new Date().toUTCString(),
        srcRaw: 'console.log(3)',
        likes: 3,
    },
];

@Injectable({
    providedIn: 'root',
})
export class SnippetsService {
    public getSnippets(userId: GUID): Observable<Snippet[]> {
        return of(snippetsMock).pipe(shareReplay(1));
    }
}
