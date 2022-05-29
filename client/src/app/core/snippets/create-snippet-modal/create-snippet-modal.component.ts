import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-create-snippet-modal',
    templateUrl: './create-snippet-modal.component.html',
    styleUrls: ['./create-snippet-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateSnippetModalComponent {
    @ViewChild('editor', { static: true })
    public editor!: ElementRef;

    constructor(
        public activeModal: NgbActiveModal,
        private readonly _cdr: ChangeDetectorRef
    ) {}

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onSave(): void {}
}
