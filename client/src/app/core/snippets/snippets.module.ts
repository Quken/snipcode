import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSnippetModalComponent } from './create-snippet-modal/create-snippet-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MouseHoverModule } from '@core/mouse-hover';

@NgModule({
    declarations: [CreateSnippetModalComponent],
    imports: [
        CommonModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        MouseHoverModule,
    ],
})
export class SnippetsModule {}
