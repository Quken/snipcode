import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CreateSnippetModalComponent,
    Snippet,
    SnippetsService,
} from '@core/snippets';
import { User, UserService } from '@core/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
    public user$: Observable<User> = this._userService.user$;
    public snippets$: Observable<Snippet[]> =
        this._snippetsService.userSnippets$;

    constructor(
        private readonly _userService: UserService,
        private readonly _snippetsService: SnippetsService,
        private readonly _modalService: NgbModal,
        private readonly _router: Router,
        private readonly _route: ActivatedRoute
    ) {}

    public onCreate(): void {
        try {
            const modal = this._modalService.open(CreateSnippetModalComponent, {
                ariaLabelledBy: 'create-snippet-modal',
                animation: true,
                backdrop: 'static',
                centered: true,
                fullscreen: true,
                keyboard: false,
                size: 'lg',
            });
        } catch (e) {}
    }

    public onSettingsClick(): void {
        this._router.navigate(['../settings'], { relativeTo: this._route });
    }
}
