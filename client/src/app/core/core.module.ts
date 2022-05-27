import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModule } from './user/user.module';
import { SnippetsModule } from './snippets/snippets.module';

@NgModule({
    imports: [CommonModule, UserModule, SnippetsModule],
})
export class CoreModule {}
