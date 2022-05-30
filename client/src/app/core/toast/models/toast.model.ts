import { TemplateRef } from '@angular/core';
import { ToastOptions } from './toast-options.model';

export interface Toast {
    textOrTemplate: string | TemplateRef<any>;
    options?: ToastOptions;
}
