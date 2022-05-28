import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';
import { SnippetsListComponent } from './snippets-list.component';
import { Snippet } from '@core/snippets';
import * as _ from 'lodash';
import * as Mocks from '@mocks/snippet';
import { SnippetListItemComponent } from './snippet-list-item/snippet-list-item.component';

describe('SnippetsListComponent', () => {
    let component: SnippetsListComponent;
    let fixture: ComponentFixture<SnippetsListComponent>;
    let modalService: NgbModal;

    const snippetMock: Snippet = _.cloneDeep(Mocks.snippetMock);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                SnippetsListComponent,
                SnippetListItemComponent,
                SnippetModalComponent,
            ],
            providers: [NgbModal],
        }).compileComponents();
        modalService = TestBed.inject(NgbModal);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SnippetsListComponent);
        component = fixture.componentInstance;
        component.snippets = [snippetMock];
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
        let modalRef: NgbModalRef;
        let openSpy: jasmine.Spy;
        beforeEach(() => {
            modalRef = {
                componentInstance: { snippet: {} },
            } as NgbModalRef;
            openSpy = spyOn(modalService, 'open').and.returnValue(modalRef);
        });
        it('should open snippet modal', () => {
            component.onOpenSnippet(snippetId);
            expect(openSpy).toHaveBeenCalledWith(SnippetModalComponent, {
                ariaLabelledBy: 'snippet-modal',
                animation: true,
                backdrop: true,
                centered: true,
                fullscreen: 'md',
                size: 'lg',
            });
        });
        it('should pass snippet info to the modal', () => {
            component.onOpenSnippet(snippetId);
            expect(modalRef.componentInstance.snippet).toEqual(snippetMock);
        });
    });
});
