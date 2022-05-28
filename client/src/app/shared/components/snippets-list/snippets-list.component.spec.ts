import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Snippet } from '@core/snippets';
import { SnippetExtensionsEnum } from '@core/snippets/enums/snippets-extensions.enum';
import { User } from '@core/user';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';

import { SnippetsListComponent } from './snippets-list.component';

const snippetMock = new Snippet({
    id: '12345',
    name: 'snippet name',
    language: 'javascript',
    createdAt: new Date().toUTCString(),
    createdBy: new User({
        id: '12345',
        name: 'John Doe',
        surname: 'Doe',
        summary: 'DevOps',
    }),
    srcRaw: 'console.log()',
    likes: 1,
    extension: SnippetExtensionsEnum.javascript,
});

describe('SnippetsListComponent', () => {
    let component: SnippetsListComponent;
    let fixture: ComponentFixture<SnippetsListComponent>;

    let modalService: NgbModal;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SnippetsListComponent],
            providers: [NgbModal],
        }).compileComponents();
        modalService = TestBed.inject(NgbModal);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SnippetsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('trackByFn', () => {
        it('should track changes by snippet id', () => {
            expect(component.trackByFn(1, snippetMock)).toEqual(snippetMock.id);
        });
    });

    describe('onOpenSnippet', () => {
        const snippetId = snippetMock.id;
        it('should open snippet modal', () => {
            const spy = spyOn(modalService, 'open');
            component.onOpenSnippet(snippetId);
            expect(spy).toHaveBeenCalledWith(SnippetModalComponent, {
                ariaLabelledBy: 'snippet-modal',
                fullscreen: true,
            });
        });
        it('should pass snippet info to the modal', () => {
            const modalRef = {
                componentInstance: { snippet: {} },
            } as NgbModalRef;
            const spy = spyOn(modalService, 'open').and.returnValue(modalRef);
            component.onOpenSnippet(snippetId);
            expect(modalRef.componentInstance.snippet).toEqual(snippetMock);
        });
    });
});
