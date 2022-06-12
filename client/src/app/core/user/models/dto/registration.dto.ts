export interface RegistrationDTO {
    password: string;
    email: string;
    name: string;
    surname: string;
    summary: string;
    age?: number;
    position?: number;
}