import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarouselImageSrc } from 'src/app/shared/components/carousel/models';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent {
    public carouselImages: CarouselImageSrc[] = [944, 1011, 984].map(
        (n) => `https://picsum.photos/id/${n}/1500/500`
    );
}
