import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetModalComponent } from './create-snippet-modal/create-snippet-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [CreateSnippetModalComponent],
    imports: [CommonModule, NgbModule],
})
export class SnippetsModule {}
