import { User } from '@core/user/models';
import { GUID } from '@shared/models/guid.model';
import { SnippetExtensionsEnum } from '../enums/snippets-extensions.enum';
import { LikedBy } from './liked-by.model';
import { SnippetLanguage } from './snippet-language';

export type DateUTC = string;

interface SnippetConfig {
    id: GUID;
    createdAt: DateUTC;
    createdBy: User;
    name: string;
    modifiedAt?: DateUTC;
    modifiedBy?: User;
    srcRaw: string;
    language: SnippetLanguage;
    extension: SnippetExtensionsEnum;
    likedBy: LikedBy[];
}

export class Snippet {
    private _id: GUID;
    private _createdAt: DateUTC;
    private _createdBy: User;
    private _name: string;
    private _modifiedAt?: DateUTC;
    private _srcRaw: string;
    private _language: SnippetLanguage;
    private _extension: SnippetExtensionsEnum;
    private _likedBy: LikedBy[];

    public get name(): string {
        return this._name;
    }

    public set name(value: string) {
        this._name = value;
    }

    public get id(): string {
        return this._id;
    }

    public get extension(): SnippetExtensionsEnum {
        return this._extension;
    }

    public get language(): SnippetLanguage {
        return this._language;
    }

    public get createdAt(): DateUTC {
        return this._createdAt;
    }

    public get modifiedAt(): DateUTC {
        return <DateUTC>this._modifiedAt;
    }

    public set modifiedAt(value: DateUTC) {
        this._modifiedAt = value;
    }

    public get createdBy(): User {
        return this._createdBy;
    }

    public get srcRaw(): string {
        return this._srcRaw;
    }

    public set srcRaw(value: string) {
        this._srcRaw = value;
    }

    public get likedBy(): LikedBy[] {
        return this._likedBy;
    }

    public set likedBy(value: LikedBy[]) {
        this._likedBy = value;
    }

    public get fullSnippetName(): string {
        return `${this.name}.${this.extension}`;
    }

    public merge(snippetDiff: Partial<Snippet>): Snippet {
        if (snippetDiff.srcRaw) {
            this.srcRaw = snippetDiff.srcRaw;
        }
        if (snippetDiff.name) {
            this.name = snippetDiff.name;
        }
        if (snippetDiff.likedBy) {
            this.likedBy = snippetDiff.likedBy;
        }
        if (snippetDiff.modifiedAt) {
            this.modifiedAt = snippetDiff.modifiedAt;
        }
        return this;
    }

    constructor({
        id,
        createdAt,
        createdBy,
        name,
        modifiedAt,
        srcRaw,
        language,
        extension,
        likedBy: likes,
    }: SnippetConfig) {
        this._id = id;
        this._createdAt = createdAt;
        this._createdBy = createdBy;
        this._name = name;
        this._modifiedAt = modifiedAt;
        this._srcRaw = srcRaw;
        this._language = language;
        this._extension = extension;
        this._likedBy = likes;
    }
}
