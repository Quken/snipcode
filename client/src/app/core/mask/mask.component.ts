import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-mask',
    templateUrl: './mask.component.html',
    styleUrls: ['./mask.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
