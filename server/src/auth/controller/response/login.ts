import { User } from '@user/models';

export interface LoginResponse {
    user: User;
    accessToken: string;
}
