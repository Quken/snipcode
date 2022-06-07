import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaskComponent, MaskService } from '@core/mask';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    @ViewChild(MaskComponent)
    public maskComponent!: MaskComponent;

    constructor(private readonly _maskService: MaskService) {}

    public ngAfterViewInit(): void {
        if (this.maskComponent) {
            this._maskService.setup(this.maskComponent);
        }
    }
}
