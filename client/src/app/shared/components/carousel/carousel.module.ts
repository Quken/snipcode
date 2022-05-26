import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [CarouselComponent],
    exports: [CarouselComponent],
    imports: [CommonModule, NgbModule],
})
export class CarouselModule {}
