import { GUID } from '@shared/models';
import { LikedBy } from '../liked-by.model';

export interface UpdateSnippetDTO {
    id: GUID;
    likedBy?: LikedBy[];
    name?: string;
    srcRaw?: string;
    modifiedAt?: GUID;
}
