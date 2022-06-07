import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaskComponent } from './mask.component';
import { MaskService } from './mask.service';

@NgModule({
    declarations: [MaskComponent],
    exports: [MaskComponent],
    providers: [MaskService],
    imports: [CommonModule],
})
export class MaskModule {}
