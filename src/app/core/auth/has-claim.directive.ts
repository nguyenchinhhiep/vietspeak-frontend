import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from './auth.service';

@Directive({
  selector: '[hasClaim]',
})
export class HasClaimDirective {
  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainerRef: ViewContainerRef,
    private _authService: AuthService
  ) {}

  @Input() set hasClaim(claimType: any) {
    if (this._authService.hasClaim(claimType)) {
      // Add template to DOM
      this._viewContainerRef.createEmbeddedView(this._templateRef);
    } else {
      // Remove template from DOM
      this._viewContainerRef.clear();
    }
  }
}
