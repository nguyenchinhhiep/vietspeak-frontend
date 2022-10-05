import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/shared/shared.module';
import { AlertService } from './alert.service';
import { AlertComponent } from './alert.component';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, SharedModule, MatIconModule],
  providers: [AlertService],
  exports: [AlertComponent],
})
export class AlertModule {}
