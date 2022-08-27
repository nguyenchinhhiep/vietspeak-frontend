import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollResetModule } from 'src/app/directives/scroll-reset/scroll-reset.module';

import { BlankLayoutComponent } from './blank.component';

@NgModule({
  declarations: [BlankLayoutComponent],
  imports: [CommonModule, ScrollResetModule, RouterModule],
  exports: [BlankLayoutComponent],
})
export class BlankLayoutModule {}
