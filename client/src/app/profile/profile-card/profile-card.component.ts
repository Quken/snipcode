import { Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CreateSnippetModalComponent,
    Snippet,
    SnippetsService,
} from '@core/snippets';
import { User, UserService } from '@core/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
    public user$: Observable<User> = this._userService.user$;
    public snippets$: Observable<Snippet[]> = this.user$.pipe(
        switchMap(({ id }: User) => this._snippetsService.getById(id))
    );

    constructor(
        private readonly _userService: UserService,
        private readonly _snippetsService: SnippetsService,
        private readonly _modalService: NgbModal
    ) {}

    public onCreate(): void {
        const modal = this._modalService.open(CreateSnippetModalComponent, {
            ariaLabelledBy: 'create-snippet-modal',
            animation: true,
            backdrop: true,
            centered: true,
            fullscreen: true,
            size: 'lg',
        });
        // modal.componentInstance.snippet = snippet;
    }
}
