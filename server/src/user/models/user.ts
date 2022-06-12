import { GUID } from '@shared/models';

export interface UserConfig {
    id: GUID;
    email: string;
    name: string;
    surname: string;
    summary: string;
    age?: number;
    position?: string;
}

export class User {
    public id: GUID;
    public email: string;
    public name: string;
    public surname: string;
    public summary: string;
    public age?: number;
    public position?: string;

    constructor({
        id,
        name,
        surname,
        summary,
        age,
        position,
        email,
    }: UserConfig) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.surname = surname;
        this.summary = summary;
        this.age = age;
        this.position = position;
    }
}
