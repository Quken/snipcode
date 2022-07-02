import { GUID } from '@shared/models';
import { SnippetExtensionsEnum, SnippetLanguagesEnum } from 'src/snippet/enum';

export interface CreateSnippetDTO {
    createdByUserId: GUID;
    name: string;
    srcRaw: string;
    language: SnippetLanguagesEnum;
    extension: SnippetExtensionsEnum;
}
