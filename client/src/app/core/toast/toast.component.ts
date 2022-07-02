import { ChangeDetectionStrategy, Component, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from './models';
import { ToastService } from './toast.service';

@Component({
    selector: 'app-toast',
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
    constructor(private readonly _toastService: ToastService) {}

    public get toasts$(): Observable<Toast[]> {
        return this._toastService.toasts$;
    }

    public remove(toast: Toast): void {
        this._toastService.remove(toast);
    }

    public getTemplateOutlet(toast: Toast): TemplateRef<any> | null {
        if (this.isTemplate(toast)) {
            return toast.textOrTemplate as TemplateRef<any>;
        }
        return null;
    }

    public isTemplate(toast: Toast): boolean {
        return toast.textOrTemplate instanceof TemplateRef;
    }
}
