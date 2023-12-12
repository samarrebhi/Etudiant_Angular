import { Directive,ElementRef,HostListener } from '@angular/core';

@Directive({
  selector: '[appFocusInput]'
})
export class FocusInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string): void {
    // Adjust the keyword as needed
    const focusKeyword = 'focus';

    if (value.toLowerCase() === focusKeyword) {
      this.el.nativeElement.focus();
    }
  }
}
