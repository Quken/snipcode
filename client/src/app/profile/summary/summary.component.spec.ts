import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '@shared/shared.module';
import { ProfileSummaryComponent } from './summary.component';

describe('ProfileSummaryComponent', () => {
    let component: ProfileSummaryComponent;
    let fixture: ComponentFixture<ProfileSummaryComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileSummaryComponent],
            imports: [NgbModule, SharedModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileSummaryComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
