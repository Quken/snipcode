import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselImage } from '@shared/components';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
    public carouselImages: CarouselImage[] = [...new Array(3)].map(
        (n, index) => ({
            src: `../../../assets/img/slider-${index + 1}.jpg`,
            title: `This is title of ${index + 1} image`,
            description: `This is description of ${index + 1} image`,
            width: 1500,
            height: 500,
        })
    );
}
