import { TestBed } from '@angular/core/testing';

import { UserSnippetsResolver } from './user-snippets.resolver';

describe('UserSnippetsResolver', () => {
    let resolver: UserSnippetsResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(UserSnippetsResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
