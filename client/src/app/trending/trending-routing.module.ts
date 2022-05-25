import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
    {
        path: '',
        component: TrendingComponent,
    },
];

@NgModule({
    declarations: [TrendingComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, TrendingComponent],
})
export class TrendingRoutingModule {}
