import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { SnippetsModule } from './snippets/snippets.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from './toast/toast.module';
import { MaskModule } from './mask';

@NgModule({
    imports: [
        CommonModule,
        UserModule,
        SnippetsModule,
        HttpClientModule,
        ToastModule,
        MaskModule,
    ],
    exports: [ToastModule, MaskModule],
})
export class CoreModule {}
