import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, SnippetsListModule } from './components';
import { SnippetModalComponent } from './components/snippet-modal/snippet-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        SnippetsListModule,
        ReactiveFormsModule,
    ],
    exports: [CarouselModule, SnippetsListModule],
    declarations: [SnippetModalComponent],
})
export class SharedModule {}
