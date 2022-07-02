import { GUID } from '@shared/models';

export interface User {
    id: GUID;
    email: string;
    name: string;
    surname: string;
    summary: string;
    age?: number;
    position?: string;
}
