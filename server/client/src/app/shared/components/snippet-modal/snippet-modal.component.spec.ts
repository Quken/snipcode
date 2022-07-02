import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetModalComponent } from './snippet-modal.component';
import * as Mocks from '@mocks/snippet';
import * as _ from 'lodash';

describe('SnippetModalComponent', () => {
    let component: SnippetModalComponent;
    let fixture: ComponentFixture<SnippetModalComponent>;

    const snippetMock = _.cloneDeep(Mocks.snippetMock);
    const activeModalMock = new NgbActiveModal();
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SnippetModalComponent],
            providers: [NgbActiveModal],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SnippetModalComponent);
        component = fixture.componentInstance;
        component.snippet = snippetMock;
        component.activeModal = activeModalMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onClose', () => {
        it('should dismiss modal', () => {
            const spy = spyOn(component.activeModal, 'dismiss');
            component.onClose();
            expect(spy).toHaveBeenCalledWith();
        });
    });

    describe('snippetFullName', () => {
        it('should get snippet full name', () => {
            expect(component.snippetFullName).toEqual(
                `Snippet "${snippetMock.fullSnippetName}"`
            );
        });
    });
});
