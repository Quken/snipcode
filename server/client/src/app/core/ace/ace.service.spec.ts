import { TestBed } from '@angular/core/testing';

import { AceService } from './ace.service';

describe('AceService', () => {
    let service: AceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
