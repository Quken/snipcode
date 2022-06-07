import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Snippet } from '@core/snippets';
import { User, UserService } from '@core/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GUID } from '@shared/models';
import { Subscription } from 'rxjs';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    styleUrls: ['./snippets-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsListComponent implements OnInit, OnDestroy {
    private readonly _subscriptions: Subscription = new Subscription();
    private _user: User | null = null;

    @Input()
    public snippets: Snippet[] = [];

    @Input()
    public classes!: string;

    @Input()
    public readOnlySnippets: boolean = true;

    @Input()
    public showAuthor: boolean = true;

    @Output()
    public likeChange: EventEmitter<GUID> = new EventEmitter();

    constructor(
        private readonly _modalService: NgbModal,
        private readonly _cdr: ChangeDetectorRef,
        private readonly _userService: UserService
    ) {}

    public ngOnInit(): void {
        this._subscriptions.add(
            this._userService.user$.subscribe((user) => {
                this._user = user;
                this._cdr.detectChanges();
            })
        );
    }

    public trackByFn(index: number, snippet: Snippet) {
        return Object.entries(snippet).reduce((acc, [key, value]) => {
            acc += JSON.stringify({ [key]: value });
            return acc;
        }, '');
    }

    public onOpenSnippet(snippetId: GUID): void {
        const snippetModal = this._modalService.open(SnippetModalComponent, {
            ariaLabelledBy: 'snippet-modal',
            animation: true,
            backdrop: 'static',
            keyboard: false,
            centered: true,
            fullscreen: 'md',
            size: 'lg',
        });
        const snippet = this.snippets.find(({ id }) => id === snippetId);
        snippetModal.componentInstance.snippet = snippet;
        snippetModal.componentInstance.readOnly = this.readOnlySnippets;
        snippetModal.result.then(() => {
            this._cdr.detectChanges();
        });
    }

    public isLikeable(snippet: Snippet): boolean {
        if (!this._user) {
            return false;
        }
        return this._user.id !== snippet.createdBy.id;
    }

    public ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }
}
