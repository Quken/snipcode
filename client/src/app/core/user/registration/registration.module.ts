import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [RegistrationComponent],
    exports: [RegistrationComponent],
    imports: [CommonModule, ReactiveFormsModule],
})
export class RegistrationModule {}
