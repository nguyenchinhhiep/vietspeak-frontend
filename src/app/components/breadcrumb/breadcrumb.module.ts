import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [BreadcrumbComponent],
})
export class BreadcrumbModule {}
