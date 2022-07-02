import { User } from '../user.model';

export interface RegistrationResponse {
    user: Partial<User>;
    accessToken: string;
}
