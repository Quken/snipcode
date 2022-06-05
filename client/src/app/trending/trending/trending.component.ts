import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
} from '@angular/core';
import { Snippet, SnippetsService } from '@core/snippets';
import { map, Subscription } from 'rxjs';
import * as _ from 'lodash';
import { GUID } from '@shared/models';
import { User, UserService } from '@core/user';

@Component({
    selector: 'app-trending',
    templateUrl: './trending.component.html',
    styleUrls: ['./trending.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrendingComponent implements OnInit, OnDestroy {
    private _subscriptions: Subscription = new Subscription();
    private _user!: User;

    public snippets$ = this._snippetsService.allSnippets$.pipe(
        map((snippets: Snippet[]) => {
            return [...snippets].sort(
                (snippetA, snippetB) => snippetB.likes - snippetA.likes
            );
        })
    );

    constructor(
        private readonly _snippetsService: SnippetsService,
        private readonly _userService: UserService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
        this._snippetsService.getAll();
        this._subscriptions.add(
            this._userService.user$.subscribe((user) => {
                this._user = user;
            })
        );
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    public onLikeChange(snippetId: GUID, snippets: Snippet[]): void {
        const snippet = snippets.find((snippet) => snippet.id === snippetId);
        if (!snippet || !this._user) {
            return;
        }
        if (snippet?.createdBy.id !== this._user.id) {
            const updatePayload: Partial<Snippet> = {
                id: snippetId,
                likes: snippet?.likes + 1,
            };
            this._subscriptions.add(
                this._snippetsService.update(updatePayload).subscribe({
                    next: () => {
                        console.log('likes increased');
                        this._cdr.detectChanges();
                    },
                })
            );
        }
    }
}
