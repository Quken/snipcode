import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    CarouselModule,
    NotFoundComponent,
    SnippetsListModule,
} from './components';
import { SnippetModalComponent } from './components/snippet-modal/snippet-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MouseHoverModule } from '@core/mouse-hover';

@NgModule({
    imports: [
        CommonModule,
        CarouselModule,
        SnippetsListModule,
        ReactiveFormsModule,
        MouseHoverModule,
    ],
    exports: [CarouselModule, SnippetsListModule, ReactiveFormsModule],
    declarations: [SnippetModalComponent, NotFoundComponent],
})
export class SharedModule {}
