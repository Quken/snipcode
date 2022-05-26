import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        FooterModule,
        HeaderModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
