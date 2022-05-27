import { User } from '@core/user/models';
import { GUID } from '@shared/models/guid.model';

export type DateUTC = string;

export interface Snippet {
    id: GUID;
    createdAt: DateUTC;
    createdBy: User;
    name: string;
    modifiedAt?: DateUTC;
    modifiedBy?: User;
    srcRaw: string;
    likes: number;
}
