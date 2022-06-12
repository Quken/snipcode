import { User } from '../user.model';

export interface RefreshResponse {
    user: Partial<User>;
    accessToken: string;
}
