import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-profile-card',
    templateUrl: './profile-card.component.html',
    styleUrls: ['./profile-card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
    public userMock = {
        name: 'John',
        surname: 'Doe',
        age: 29,
        position: 'Software Engineer',
    };

    public get fullName(): string {
        return `${this.userMock.name} ${this.userMock.surname}`;
    }
}
