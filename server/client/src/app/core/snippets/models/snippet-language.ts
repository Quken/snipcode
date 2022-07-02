export const snippetLanguages = [
    'html',
    'javascript',
    'typescript',
    'css',
    'scss',
    'csharp',
    'cpp',
] as const;

export type SnippetLanguage = typeof snippetLanguages[number];
