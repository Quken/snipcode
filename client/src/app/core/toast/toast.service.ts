import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Toast } from './models';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    private _toastsSubject: Subject<Toast[]> = new Subject();
    public toasts$: Observable<Toast[]> = this._toastsSubject.asObservable();

    private _toasts: Toast[] = [];

    private _show(toast: Toast): void {
        this._toasts.push(toast);
        this._toastsSubject.next(this._toasts);
    }

    public isTemplate(toast: Toast): boolean {
        return toast.textOrTemplate instanceof TemplateRef;
    }

    public showStandard(toast: Toast): void {
        this._show(toast);
    }

    public showSuccess(toast: Toast): void {
        const successToast: Toast = {
            ...toast,
            options: {
                className: 'bg-success text-light',
                delay: 10000,
                ...toast.options,
            },
        };
        this._show(successToast);
    }

    public showDanger(toast: Toast): void {
        const dangerToast: Toast = {
            ...toast,
            options: {
                className: 'bg-danger text-light',
                delay: 15000,
                ...toast.options,
            },
        };
        this._show(dangerToast);
    }

    public remove(toast: any): void {
        this._toasts = this._toasts.filter((t) => t !== toast);
        this._toastsSubject.next(this._toasts);
    }

    public clear() {
        this._toasts.splice(0, this._toasts.length);
        this._toastsSubject.next(this._toasts);
    }
}
