import { GUID } from '@shared/models';
import { LikedBy } from '../model';

export interface UpdateSnippetDTO {
    id: GUID;
    likedBy?: LikedBy[];
    name?: string;
    srcRaw?: string;
    modifiedAt?: GUID;
    userId: GUID;
}
