import { AfterContentInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[autoFocus]',
})
export class AutoFocusDirective implements AfterContentInit {
  @Input() public autoFocus: boolean = true;

  constructor(private el: ElementRef) {}

  ngAfterContentInit() {
    setTimeout(() => {
      this.el.nativeElement.focus();
    }, 100);
  }
}
