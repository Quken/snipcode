import { ComponentFixture, TestBed } from '@angular/core/testing';
import { snippetMock } from '@mocks/snippet';
import { SnippetListItemComponent } from './snippet-list-item.component';
import * as _ from 'lodash';
import * as Mocks from '@mocks/snippet';

describe('SnippetListItemComponent', () => {
    let component: SnippetListItemComponent;
    let fixture: ComponentFixture<SnippetListItemComponent>;

    const snippetMock = _.cloneDeep(Mocks.snippetMock);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SnippetListItemComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SnippetListItemComponent);
        component = fixture.componentInstance;
        component.snippet = snippetMock;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
