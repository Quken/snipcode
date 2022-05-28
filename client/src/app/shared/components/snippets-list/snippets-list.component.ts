import {
    ChangeDetectionStrategy,
    Component,
    Input,
    TrackByFunction,
} from '@angular/core';
import { Snippet } from '@core/snippets';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GUID } from '@shared/models';
import { SnippetModalComponent } from '../snippet-modal/snippet-modal.component';

@Component({
    selector: 'app-snippets-list',
    templateUrl: './snippets-list.component.html',
    styleUrls: ['./snippets-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetsListComponent {
    @Input()
    public snippets: Snippet[] = [];

    constructor(private readonly _modalService: NgbModal) {}

    public trackByFn(index: number, snippet: Snippet) {
        return snippet.id;
    }

    public onOpenSnippet(snippetId: GUID): void {
        const snippetModal = this._modalService.open(SnippetModalComponent, {
            ariaLabelledBy: 'snippet-modal',
            animation: true,
            backdrop: true,
            centered: true,
            fullscreen: 'md',
            size: 'lg',
        });
        const snippet = this.snippets.find(({ id }) => id === snippetId);
        snippetModal.componentInstance.snippet = snippet;
    }
}
