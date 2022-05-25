import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppHeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppNavComponent } from './app-nav/nav.component';
import { AppFooterComponent } from './footer/footer.component';
import { AppNavItemComponent } from './nav-item/nav-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        AppFooterComponent,
        AppNavComponent,
        AppNavItemComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, NgbModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
