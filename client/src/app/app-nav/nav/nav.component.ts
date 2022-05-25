import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavComponent {
    public navItems = [
        { title: 'Profile', route: '/profile' },
        { title: 'Trending', route: '/trending' },
    ];
}
