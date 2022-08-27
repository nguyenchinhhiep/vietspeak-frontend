import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppCheckboxComponent } from './checkbox.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppCheckboxComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [AppCheckboxComponent],
})
export class AppCheckboxModule {}
