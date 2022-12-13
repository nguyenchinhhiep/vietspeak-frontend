import {
  Directive,
  ElementRef,
  Renderer2,
  AfterViewInit,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appPreventAutoFill]',
})
export class PreventAutoFillDirective implements OnInit, AfterViewInit {
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.el.nativeElement.disabled = true;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const randomString = Math.random().toString(36).slice(-6);
      this.renderer.setAttribute(this.el.nativeElement, 'name', randomString);
      this.renderer.setAttribute(
        this.el.nativeElement,
        'autocomplete',
        randomString
      );
      this.el.nativeElement.disabled = false;
    }, 200);
  }
}
