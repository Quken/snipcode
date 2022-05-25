import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppHeaderComponent } from './header/header.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppFooterComponent } from './footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppNavModule } from './app-nav/nav.module';

@NgModule({
    declarations: [AppComponent, AppHeaderComponent, AppFooterComponent],
    imports: [BrowserModule, AppRoutingModule, NgbModule, AppNavModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
