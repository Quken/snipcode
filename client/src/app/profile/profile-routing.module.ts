import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSnippetsResolver } from '@core/snippets';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './settings/settings.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        resolve: {
            snippets: AllSnippetsResolver,
        },
        children: [
            {
                path: 'profile-card',
                component: ProfileCardComponent,
            },
            {
                path: 'settings',
                component: ProfileSettingsComponent,
            },
            {
                path: '',
                redirectTo: 'profile-card',
                pathMatch: 'full',
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ProfileRoutingModule {}
