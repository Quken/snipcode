import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselImage } from 'src/app/shared/components/carousel/models';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
    public carouselImages: CarouselImage[] = [944, 1011, 984].map(
        (n, index) => ({
            src: `https://picsum.photos/id/${n}/1500/500`,
            title: `This is title of ${index + 1} image`,
            description: `This is description of ${index + 1} image`,
        })
    );
}
