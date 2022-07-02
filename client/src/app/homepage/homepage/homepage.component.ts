import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselImage } from '@shared/components';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
    public carouselImages: CarouselImage[] = [
        {
            src: `../../../assets/img/slider-1.jpg`,
            title: `Access your code everywhere`,
        },
        {
            src: `../../../assets/img/slider-2.jpg`,
            title: `Share code examples quickly`,
        },
        {
            src: `../../../assets/img/slider-3.jpg`,
            title: `Get free access`,
            description: `Use Snipcode absolutely for free`,
        },
    ];
}
