import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSummaryComponent } from './summary/summary.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ProfileComponent,
        ProfileCardComponent,
        ProfileSummaryComponent,
    ],
    exports: [ProfileComponent],
    imports: [CommonModule, ProfileRoutingModule, NgbModule, SharedModule],
})
export class ProfileModule {}
