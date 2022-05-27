import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnippetListItemComponent } from './snippet-list-item.component';

describe('SnippetListItemComponent', () => {
  let component: SnippetListItemComponent;
  let fixture: ComponentFixture<SnippetListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnippetListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnippetListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
