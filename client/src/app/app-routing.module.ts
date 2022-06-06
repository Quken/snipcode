import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@core/user';
import { AuthGuard } from '@core/user/guards';
import { RegistrationComponent } from '@core/user/registration';
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
        canActivate: [AuthGuard],
        loadChildren: () =>
            import('./profile/profile.module').then((m) => m.ProfileModule),
    },
    {
        path: 'trending',
        loadChildren: () =>
            import('./trending/trending.module').then((m) => m.TrendingModule),
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegistrationComponent,
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
