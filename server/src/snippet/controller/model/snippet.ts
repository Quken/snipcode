import { GUID } from '@shared/models';
import { SnippetExtensionsEnum, SnippetLanguagesEnum } from '@snippet/enum';
import { User } from '@user/models';

import { LikedBy } from './liked-by';

export interface Snippet {
    id: GUID;
    createdAt: string;
    createdBy: User;
    name: string;
    modifiedAt?: string;
    srcRaw: string;
    language: SnippetLanguagesEnum;
    extension: SnippetExtensionsEnum;
    likedBy: LikedBy[];
}
