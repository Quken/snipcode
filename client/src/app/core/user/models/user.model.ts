import { GUID } from '@shared/models/guid.model';

export interface User {
    id: GUID;
    name: string;
    surname: string;
    summary: string;
    age?: number;
    position?: string;
}
