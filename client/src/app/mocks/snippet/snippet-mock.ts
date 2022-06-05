import { Snippet } from '@core/snippets';
import { SnippetExtensionsEnum } from '@core/snippets/enums/snippets-extensions.enum';
import { User } from '@core/user';

export const snippetMock = new Snippet({
    id: '12345',
    createdAt: new Date().toUTCString(),
    createdBy: new User({
        id: '1',
        name: 'username',
        surname: 'usersurname',
        summary: 'some user summary',
        position: 'dev ops',
    }),
    srcRaw: 'alert(1)',
    name: 'snippet',
    language: 'javascript',
    extension: SnippetExtensionsEnum.javascript,
    likedBy: 1,
});
