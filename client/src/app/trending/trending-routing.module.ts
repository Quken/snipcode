import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllSnippetsResolver } from '@core/snippets';
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
    {
        path: '',
        component: TrendingComponent,
        resolve: {
            snippets: AllSnippetsResolver,
        },
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TrendingRoutingModule {}
