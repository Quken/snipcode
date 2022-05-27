import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/user/models';
import { UserService } from '@core/user/user.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-profile-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileSummaryComponent {
    public user$: Observable<User> = this._userService.user$;

    constructor(private readonly _userService: UserService) {}
}
