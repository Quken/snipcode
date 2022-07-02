import { SnippetExtensionsEnum } from '@core/snippets/enums';
import { GUID } from '@shared/models';
import { SnippetLanguage } from '../snippet-language';
import { DateUTC } from '../snippet.model';

export interface CreateSnippetDTO {
    // createdAt: DateUTC;
    createdByUserId: GUID;
    name: string;
    srcRaw: string;
    language: SnippetLanguage;
    extension: SnippetExtensionsEnum;
}
