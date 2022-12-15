import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutModule } from '../admin/admin.module';

import { AuthenticatedLayoutComponent } from './authenticated.component';
import { ClientLayoutModule } from '../client/client.module';
import { BlankLayoutModule } from '../blank/blank.module';

@NgModule({
  declarations: [AuthenticatedLayoutComponent],
  imports: [CommonModule, AdminLayoutModule, BlankLayoutModule, ClientLayoutModule],
  exports: [AuthenticatedLayoutComponent],
})
export class AuthenticatedLayoutModule {}
