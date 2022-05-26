import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        pathMatch: 'exact',
    },
];

@NgModule({
    declarations: [ProfileComponent, ProfileCardComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [RouterModule, ProfileComponent],
})
export class ProfileRoutingModule {}
