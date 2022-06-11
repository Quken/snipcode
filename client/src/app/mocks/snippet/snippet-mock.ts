import { Snippet, SnippetExtensionsEnum } from '@core/snippets';
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
        email: 'user@mock.com',
    }),
    srcRaw: 'alert(1)',
    name: 'snippet',
    language: 'javascript',
    extension: SnippetExtensionsEnum.javascript,
    likedBy: [],
});
