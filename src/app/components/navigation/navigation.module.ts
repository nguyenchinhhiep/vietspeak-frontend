import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { VerticalNavigationAsideItemComponent } from './vertical/components/aside/aside.component';
import { VerticalNavigationBasicItemComponent } from './vertical/components/basic/basic.component';
import { VerticalNavigationCollapsableItemComponent } from './vertical/components/collapsable/collapsable.component';
import { VerticalNavigationDividerItemComponent } from './vertical/components/divider/divider.component';
import { VerticalNavigationGroupItemComponent } from './vertical/components/group/group.component';
import { VerticalNavigationComponent } from './vertical/vertical.component';
import { OverlayScrollbarModule } from 'src/app/directives/overlay-scrollbar/overlay-scrollbar.module';

@NgModule({
  declarations: [
    VerticalNavigationAsideItemComponent,
    VerticalNavigationBasicItemComponent,
    VerticalNavigationCollapsableItemComponent,
    VerticalNavigationDividerItemComponent,
    VerticalNavigationGroupItemComponent,
    VerticalNavigationComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    OverlayScrollbarModule,
    MatTooltipModule,
    RouterModule,
  ],
  exports: [VerticalNavigationComponent],
})
export class NavigationComponentModule {}
