import { TestBed } from '@angular/core/testing';

import { AllSnippetsResolver } from './all-snippets.resolver';

describe('ResolverResolver', () => {
    let resolver: AllSnippetsResolver;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        resolver = TestBed.inject(AllSnippetsResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });
});
