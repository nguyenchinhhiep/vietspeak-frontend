import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../../components/header/header.module';

import { AdminLayoutComponent } from './admin.component';

@NgModule({
  declarations: [AdminLayoutComponent],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule,
  ],
  exports: [AdminLayoutComponent],
})
export class AdminLayoutModule {}
