import { GUID } from '@shared/models/guid.model';

export interface UserConfig {
    id: GUID;
    name: string;
    surname: string;
    summary: string;
    age?: number;
    position?: string;
}

export class User {
    public id: GUID;
    public name: string;
    public surname: string;
    public summary: string;
    public age?: number;
    public position?: string;

    constructor({ id, name, surname, summary, age, position }: UserConfig) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.summary = summary;
        this.age = age;
        this.position = position;
    }
}
