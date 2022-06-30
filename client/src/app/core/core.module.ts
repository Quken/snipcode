import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { SnippetsModule } from './snippets/snippets.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastModule } from './toast/toast.module';
import { MaskModule } from './mask';
import { JwtInterceptor, LoginModule } from './user';
import { RegistrationModule } from './user/registration';
import { MouseHoverModule } from './mouse-hover';
import { PendingChangesGuard } from './pending-changes';

@NgModule({
    imports: [
        CommonModule,
        UserModule,
        SnippetsModule,
        HttpClientModule,
        ToastModule,
        MaskModule,
        MouseHoverModule,
    ],
    exports: [
        ToastModule,
        MaskModule,
        LoginModule,
        RegistrationModule,
        MouseHoverModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            multi: true,
            useClass: JwtInterceptor,
        },
        PendingChangesGuard,
    ],
})
export class CoreModule {}
