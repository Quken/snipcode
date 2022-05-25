import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavItemComponent {}
