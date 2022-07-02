import { User } from '../user.model';

export interface LoginResponse {
    user: Partial<User>;
    accessToken: string;
}
