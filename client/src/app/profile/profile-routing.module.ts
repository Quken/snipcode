import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        pathMatch: 'exact',
    },
];

@NgModule({
    declarations: [ProfileComponent],
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, ProfileComponent],
})
export class ProfileRoutingModule {}
