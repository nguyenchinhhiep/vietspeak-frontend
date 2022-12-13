import { NgModule } from '@angular/core';
import { PreventAutoFillDirective } from './prevent-autofill.directive';

@NgModule({
  declarations: [PreventAutoFillDirective],
  exports: [PreventAutoFillDirective],
})
export class PreventAutofillModule {}
