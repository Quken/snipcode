import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopyrightComponent } from './copyright/copyright.component';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';
import { NavModule } from '../app-nav/nav.module';

@NgModule({
    declarations: [FooterComponent, CopyrightComponent],
    exports: [FooterComponent, CopyrightComponent],
    imports: [CommonModule, RouterModule, NavModule],
})
export class FooterModule {}
