import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SwitchSchemeComponent } from './switch-scheme.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SwitchSchemeComponent],
  imports: [CommonModule, MatSlideToggleModule, ReactiveFormsModule],
  exports: [SwitchSchemeComponent],
})
export class SwitchSchemeModule {}
