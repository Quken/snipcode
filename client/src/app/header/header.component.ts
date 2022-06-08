import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
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
        private readonly _changeDetectorRef: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this._subscriptions.add(
            this._userService.user$
                .pipe(
                    map((user) => {
                        if (!user) {
                            return null;
                        }
                        return user;
                    })
                )
                .subscribe((user) => {
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
}
