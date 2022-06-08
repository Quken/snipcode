import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MouseHoverModule } from '@core/mouse-hover';

@NgModule({
    declarations: [LoginComponent],
    exports: [LoginComponent],
    imports: [CommonModule, ReactiveFormsModule, MouseHoverModule],
})
export class LoginModule {}
