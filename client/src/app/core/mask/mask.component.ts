import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskComponent implements OnInit {
    @Output()
    public show$: Subject<boolean> = new Subject();

    constructor() {}

    ngOnInit(): void {}
}
