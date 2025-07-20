import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appButtonStyle]',
    standalone: false
})
export class ButtonStyleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(this.el.nativeElement, 'text-white');
    this.renderer.addClass(this.el.nativeElement, 'px-4');
    this.renderer.addClass(this.el.nativeElement, 'py-2');
    this.renderer.addClass(this.el.nativeElement, 'rounded-lg');
  }
}
