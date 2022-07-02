import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CarouselImage } from './models';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent {
    @Input()
    public images!: CarouselImage[];
}
