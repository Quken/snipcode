import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule, SnippetsListModule } from './components';

@NgModule({
    imports: [CommonModule, CarouselModule, SnippetsListModule],
    exports: [CarouselModule, SnippetsListModule],
})
export class SharedModule {}
