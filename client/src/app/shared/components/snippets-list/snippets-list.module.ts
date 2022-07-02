import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnippetsListComponent } from './snippets-list.component';
import { SnippetListItemComponent } from './snippet-list-item/snippet-list-item.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MouseHoverModule } from '@core/mouse-hover';

@NgModule({
    declarations: [SnippetsListComponent, SnippetListItemComponent],
    exports: [SnippetsListComponent],
    providers: [NgbModal],
    imports: [CommonModule, MouseHoverModule],
})
export class SnippetsListModule {}
