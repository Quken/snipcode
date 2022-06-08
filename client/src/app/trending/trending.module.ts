import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrendingRoutingModule } from './trending-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { TrendingComponent } from './trending/trending.component';

@NgModule({
    imports: [CommonModule, TrendingRoutingModule, NgbModule, SharedModule],
    exports: [TrendingComponent],
    declarations: [TrendingComponent],
})
export class TrendingModule {}
