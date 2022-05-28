import { User } from '@core/user';

export const userMock = new User({
    id: '12345',
    name: 'John',
    surname: 'Doe',
    summary: 'Quality assurance',
    age: 30,
    position: 'QA',
});
