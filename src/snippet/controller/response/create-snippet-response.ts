import { GUID } from '@shared/models';
import { SnippetExtensionsEnum, SnippetLanguagesEnum } from '@snippet/enum';
import { User } from '@user/models';
import { LikedBy } from '../model';

export interface CreateSnippetResponse {
    id: GUID;
    createdAt: string;
    createdBy: User;
    name: string;
    srcRaw: string;
    language: SnippetLanguagesEnum;
    extension: SnippetExtensionsEnum;
    likedBy: LikedBy[];
}
