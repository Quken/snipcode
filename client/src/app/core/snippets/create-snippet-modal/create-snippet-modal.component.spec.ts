import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSnippetModalComponent } from './create-snippet-modal.component';

describe('CreateSnippetModalComponent', () => {
    let component: CreateSnippetModalComponent;
    let fixture: ComponentFixture<CreateSnippetModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CreateSnippetModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateSnippetModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
