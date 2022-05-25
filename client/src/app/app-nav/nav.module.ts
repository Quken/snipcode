import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { AppNavComponent } from './nav/nav.component';

@NgModule({
    declarations: [AppNavComponent, AppNavItemComponent],
    exports: [AppNavComponent, AppNavItemComponent],
    imports: [CommonModule, RouterModule],
})
export class AppNavModule {}
