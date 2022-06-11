import { SnippetExtensionsEnum } from '@core/snippets/enums';
import { User } from '@core/user';
import { SnippetLanguage } from '../snippet-language';
import { DateUTC } from '../snippet.model';

export interface CreateSnippetDTO {
    createdAt: DateUTC;
    createdBy: User;
    name: string;
    srcRaw: string;
    language: SnippetLanguage;
    extension: SnippetExtensionsEnum;
}
