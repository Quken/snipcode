import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { MaskService } from '@core/mask';
import { Toast } from '@core/toast/models';
import { ToastService } from '@core/toast/toast.service';
import { User, UserService } from '@core/user';
import { map, Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
    private readonly _subscriptions: Subscription = new Subscription();

    public user: User | null = null;

    constructor(
        private readonly _userService: UserService,
        private readonly _router: Router,
        private readonly _changeDetectorRef: ChangeDetectorRef,
        private readonly _toastService: ToastService,
        private readonly _maskService: MaskService
    ) {}

    public ngOnInit(): void {
        this._subscriptions.add(
            this._userService.user$.subscribe((user) => {
                this.user = user;
                this._changeDetectorRef.detectChanges();
            })
        );
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public onLogin(): void {
        this._router.navigate(['/login']);
    }

    public onRegister(): void {
        this._router.navigate(['/register']);
    }

    public onLogoClick(): void {
        this._router.navigate(['/']);
    }

    public onLogout(): void {
        this._maskService.show();
        this._userService.logout().subscribe({
            next: () => {
                this._maskService.hide();
                const toast: Toast = {
                    textOrTemplate: `Successfully logged out`,
                };
                this._toastService.showSuccess(toast);
                this._changeDetectorRef.detectChanges();

                this._router.navigate(['/']);
            },
            error: (e) => {
                this._maskService.hide();
                const toast: Toast = {
                    textOrTemplate: `Oops.. Something went wrong during logout.`,
                };
                console.log(e);
                this._toastService.showDanger(toast);
                this._changeDetectorRef.detectChanges();
            },
        });
    }
}
