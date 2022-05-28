import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Snippet } from '@core/snippets';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-snippet-modal',
    templateUrl: './snippet-modal.component.html',
    styleUrls: ['./snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnippetModalComponent {
    @Input()
    snippet!: Snippet;

    constructor(public activeModal: NgbActiveModal) {}

    public onClose() {
        this.activeModal.dismiss();
    }

    public get snippetFullName(): string {
        return `Snippet "${this.snippet.fullSnippetName}"`;
    }
}
