import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MouseHoverModule } from '@core/mouse-hover';

@NgModule({
    declarations: [RegistrationComponent],
    exports: [RegistrationComponent],
    imports: [CommonModule, ReactiveFormsModule, MouseHoverModule],
})
export class RegistrationModule {}
