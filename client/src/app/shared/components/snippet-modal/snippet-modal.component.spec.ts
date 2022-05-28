import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SnippetModalComponent } from './snippet-modal.component';
import * as Mocks from '@mocks/snippet';
import * as _ from 'lodash';

describe('SnippetModalComponent', () => {
    let component: SnippetModalComponent;
    let fixture: ComponentFixture<SnippetModalComponent>;

    const snippetMock = _.cloneDeep(Mocks.snippetMock);
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
