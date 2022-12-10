import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AlertModule } from '../alert/alert.module';
import { ToastService } from './toast.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    AlertModule
  ],
  providers: [
    ToastService
  ]
})
export class ToastModule { }
