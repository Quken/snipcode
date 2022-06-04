import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components';
import { HomepageModule } from './homepage/homepage.module';
import { HomepageComponent } from './homepage/homepage/homepage.component';

const routes: Routes = [
    {
        path: '',
        component: HomepageComponent,
        pathMatch: 'full',
    },
    {
        path: 'profile',
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfileModule),
    },
    {
        path: 'trending',
        loadChildren: () =>
            import('./trending/trending.module').then((m) => m.TrendingModule),
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes), HomepageModule],
    exports: [RouterModule],
})
export class AppRoutingModule {}
