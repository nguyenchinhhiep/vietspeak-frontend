import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminHeaderModule } from './components/header/header.module';
import { UserModule } from '../../components/user/user.module';
import { NavigationComponentModule } from 'src/app/components/navigation/navigation.module';
import { AdminLayoutComponent } from './admin.component';
import { ScrollResetModule } from 'src/app/directives/scroll-reset/scroll-reset.module';
import { BreadcrumbModule } from 'src/app/components/breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    NavigationComponentModule,
    AdminHeaderModule,
    UserModule,
    ScrollResetModule,
    BreadcrumbModule,
    RouterModule,
  ],
  exports: [AdminLayoutComponent],
})
export class AdminLayoutModule {}
