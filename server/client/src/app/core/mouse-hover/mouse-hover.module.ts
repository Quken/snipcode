import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MouseHoverDirective } from './mouse-hover.directive';

@NgModule({
    declarations: [MouseHoverDirective],
    exports: [MouseHoverDirective],
    imports: [CommonModule],
})
export class MouseHoverModule {}
