import { User } from '@user/models';

export interface RegistrationResponse {
    user: User;
    accessToken: string;
}
