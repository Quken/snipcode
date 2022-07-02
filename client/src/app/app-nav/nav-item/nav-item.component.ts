import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavItemConfig } from '../models';

@Component({
    selector: 'app-nav-item',
    templateUrl: './nav-item.component.html',
    styleUrls: ['./nav-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavItemComponent {
    @Input()
    public config!: NavItemConfig;
}
