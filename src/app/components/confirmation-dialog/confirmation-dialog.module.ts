import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogService } from './confirmation-dialog.service';
import { AutoFocusModule } from 'src/app/directives/auto-focus/auto-focus.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [CommonModule, MatDialogModule, MatIconModule, AutoFocusModule, MatButtonModule],
  providers: [ConfirmationDialogService],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
