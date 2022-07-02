import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalConfig } from '@shared/models';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html',
    styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent {
    @Input()
    public config!: ConfirmationModalConfig;

    constructor(public activeModal: NgbActiveModal) {}

    public onClose(): void {
        this.activeModal.dismiss();
    }

    public onSecondaryButtonClick(): void {
        this.activeModal.close(this.config.secondaryButton.value);
    }

    public onPrimaryButtonClick(): void {
        this.activeModal.close(this.config.primaryButton.value);
    }
}
