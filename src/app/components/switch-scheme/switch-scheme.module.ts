import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SwitchSchemeComponent } from './switch-scheme.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SwitchSchemeComponent],
  imports: [TranslateModule, MatSlideToggleModule, ReactiveFormsModule],
  exports: [SwitchSchemeComponent],
})
export class SwitchSchemeModule {}
