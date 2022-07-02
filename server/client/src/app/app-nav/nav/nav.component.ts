import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavItemConfig } from '../models';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
    public navItems: NavItemConfig[] = [
        { title: 'Home', route: '' },
        { title: 'Profile', route: 'profile' },
        { title: 'Trending', route: 'trending' },
    ];
}
