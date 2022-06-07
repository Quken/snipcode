import { Injectable } from '@angular/core';
import { MaskComponent } from './mask.component';

@Injectable({
    providedIn: 'root',
})
export class MaskService {
    private _maskComponent!: MaskComponent;

    public setup(maskComponent: MaskComponent): void {
        if (!this._maskComponent) {
            this._maskComponent = maskComponent;
        }
    }

    public show(): void {
        if (!this._maskComponent) {
            return;
        }
        this._maskComponent.show$.next(true);
    }

    public hide(): void {
        if (!this._maskComponent) {
            return;
        }
        this._maskComponent.show$.next(false);
    }
}
