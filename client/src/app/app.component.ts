import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MaskComponent, MaskService } from '@core/mask';
import { UserService } from '@core/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnInit {
    @ViewChild(MaskComponent)
    public maskComponent!: MaskComponent;

    constructor(
        private readonly _maskService: MaskService,
        private readonly _userService: UserService
    ) {}

    public ngOnInit(): void {
        this._userService.verifyUser();
    }

    public ngAfterViewInit(): void {
        if (this.maskComponent) {
            this._maskService.setup(this.maskComponent);
        }
    }
}
