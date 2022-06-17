import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    public encrypt(message: string, key: string): string {
        return CryptoJS.AES.encrypt(message, key).toString();
    }

    public decrypt(message: string, key: string): string {
        return CryptoJS.AES.decrypt(message, key).toString();
    }

    public hash(message: string): string {
        return CryptoJS.SHA1(message).toString();
    }
}
