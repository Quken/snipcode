import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSummaryComponent } from './summary/summary.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        pathMatch: 'exact',
    },
];

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileCardComponent,
        ProfileSummaryComponent,
    ],
    imports: [CommonModule, RouterModule.forChild(routes), NgbModule],
    exports: [RouterModule, ProfileComponent],
})
export class ProfileRoutingModule {}
