import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { I18nService } from './i18n.service';

@NgModule({
  declarations: [],
  imports: [CommonModule, TranslateModule.forRoot()],
  providers: [I18nService],
  exports: [TranslateModule],
})
export class TranslationModule {}
