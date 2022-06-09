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
    private _user!: User | null;

    public snippets$ = this._snippetsService.allSnippets$.pipe(
        map((snippets: Snippet[]) => {
            return [...snippets].sort(
                (snippetA, snippetB) =>
                    snippetB.likedBy.length - snippetA.likedBy.length
            );
        })
    );

    constructor(
        private readonly _snippetsService: SnippetsService,
        private readonly _userService: UserService,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public ngOnInit(): void {
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
        if (
            !snippet ||
            !this._user ||
            snippet?.createdBy.id === this._user.id
        ) {
            return;
        }
        const isExists = snippet.likedBy.some(
            ({ id }) => id === (<User>this._user).id
        );
        let likedBy = [];
        if (isExists) {
            likedBy = snippet.likedBy.filter(
                ({ id }) => id !== (<User>this._user).id
            );
        } else {
            likedBy = [
                ...snippet.likedBy,
                {
                    id: this._user.id,
                    name: this._user.name,
                    surname: this._user.surname,
                },
            ];
        }
        const updatePayload: Partial<Snippet> = {
            id: snippetId,
            likedBy,
        };
        this._subscriptions.add(
            this._snippetsService.update(updatePayload).subscribe({
                next: () => {
                    this._cdr.detectChanges();
                },
            })
        );
    }
}
