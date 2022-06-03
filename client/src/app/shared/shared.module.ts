import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    CarouselModule,
    NotFoundComponent,
    SnippetsListModule,
} from './components';
import { SnippetModalComponent } from './components/snippet-modal/snippet-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        SnippetsListModule,
        ReactiveFormsModule,
    ],
    exports: [CarouselModule, SnippetsListModule, ReactiveFormsModule],
    declarations: [SnippetModalComponent, NotFoundComponent],
})
export class SharedModule {}
