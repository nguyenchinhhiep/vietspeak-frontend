import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientLayoutComponent } from './client.component';
import { ScrollResetModule } from 'src/app/directives/scroll-reset/scroll-reset.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ClientLayoutComponent],
  imports: [CommonModule, ScrollResetModule, RouterModule],
  exports: [ClientLayoutComponent],
})
export class ClientLayoutModule {}
