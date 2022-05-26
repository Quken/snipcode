import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from './homepage/homepage.component';
import { CarouselModule } from '../shared/components/carousel/carousel.module';

@NgModule({
    declarations: [HomepageComponent],
    exports: [HomepageComponent],
    imports: [CommonModule, CarouselModule],
})
export class HomepageModule {}
