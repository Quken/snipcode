import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Snippet, SnippetsService } from '@core/snippets';
import { User, UserService } from '@core/user';
import { snippetMock } from '@mocks/snippet';
import { userMock } from '@mocks/user';
import { Observable, of, shareReplay } from 'rxjs';

import { ProfileCardComponent } from './profile-card.component';

class UserServiceMock extends UserService {
    public override user$: Observable<User> = of(userMock).pipe(shareReplay(1));
}

class SnippetsServiceMock extends SnippetsService {
    public override getById(): Observable<Snippet[]> {
        return of([snippetMock]).pipe(shareReplay(1));
    }
}

describe('ProfileCardComponent', () => {
    let component: ProfileCardComponent;
    let fixture: ComponentFixture<ProfileCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileCardComponent],
            providers: [
                {
                    provide: UserService,
                    useClass: UserServiceMock,
                },
                {
                    provide: SnippetsService,
                    useClass: SnippetsServiceMock,
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('user$', () => {
        it('should return user$', (done) => {
            component.user$.subscribe((user) => {
                expect(user).toEqual(userMock);
                done();
            });
        });
    });

    describe('snippets$', () => {
        it('should get snippets for current user', (done) => {
            component.snippets$.subscribe((snippets) => {
                expect(snippets).toEqual([snippetMock]);
                done();
            });
        });
    });
});
