import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@core/user/models';
import { Observable } from 'rxjs';

import { UserService } from 'src/app/core/user/user.service';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
    public user$: Observable<User> = this._userService.user$;

    constructor(private readonly _userService: UserService) {}
}
