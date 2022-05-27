import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnippetsListComponent } from './snippets-list.component';

@NgModule({
    declarations: [SnippetsListComponent],
    exports: [SnippetsListComponent],
    imports: [CommonModule],
})
export class SnippetsListModule {}
