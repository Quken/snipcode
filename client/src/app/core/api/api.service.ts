import { environment } from 'src/environments/environment';

export class ApiService {
    public static baseUrl = environment.apiUrl;

    public static get auth(): string {
        return `${this.baseUrl}/auth`;
    }

    public static get snippet(): string {
        return `${this.baseUrl}/snippet`;
    }

    public static get settings(): string {
        return `${this.baseUrl}/settings`;
    }

    public static get editorSettings(): string {
        return `${this.settings}/editor`;
    }
}
