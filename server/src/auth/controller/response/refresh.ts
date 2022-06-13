import { User } from '@user/models';

export interface RefreshResponse {
    user: User;
    accessToken: string;
}
