import { User } from '@user/models';

export interface RefreshResponse {
    accessToken: string;
    user: User;
}
