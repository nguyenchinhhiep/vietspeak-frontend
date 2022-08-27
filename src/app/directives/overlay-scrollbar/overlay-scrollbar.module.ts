import { NgModule } from '@angular/core';
import { OverlayScrollbarDirective } from './overlay-scrollbar.directive';

@NgModule({
  declarations: [OverlayScrollbarDirective],
  exports: [OverlayScrollbarDirective],
})
export class OverlayScrollbarModule {}
