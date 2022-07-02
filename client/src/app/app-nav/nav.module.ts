import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavItemComponent } from './nav-item/nav-item.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
    declarations: [NavComponent, NavItemComponent],
    exports: [NavComponent, NavItemComponent],
    imports: [CommonModule, RouterModule],
})
export class NavModule {}
