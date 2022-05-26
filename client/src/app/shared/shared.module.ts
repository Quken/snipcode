import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from './components/carousel/carousel.module';

@NgModule({
    imports: [CommonModule, CarouselModule],
})
export class SharedModule {}
