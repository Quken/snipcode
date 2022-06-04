import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
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

    @Input()
    public classes!: string;

    @Input()
    public readOnlySnippets: boolean = true;

    @Input()
    public showAuthor: boolean = true;

    constructor(
        private readonly _modalService: NgbModal,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public trackByFn(index: number, snippet: Snippet) {
        console.log(
            Object.entries(snippet).reduce((acc, [key, value]) => {
                acc += JSON.stringify({ [key]: value });
                return acc;
            }, '')
        );
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
            debugger;
        });
    }
}
