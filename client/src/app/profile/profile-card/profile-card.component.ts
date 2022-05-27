import { Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Snippet, SnippetsService } from '@core/snippets';
import { User, UserService } from '@core/user';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
    public user$: Observable<User> = this._userService.user$;
    public snippets$: Observable<Snippet[]> = this.user$.pipe(
        switchMap(({ id }: User) => this._snippetsService.getSnippets(id))
    );

    constructor(
        private readonly _userService: UserService,
        private readonly _snippetsService: SnippetsService
    ) {}
}
