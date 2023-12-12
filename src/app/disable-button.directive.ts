import { Directive, Input, HostListener, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

@Directive({
  selector: '[appDisableButton]'
})
export class DisableButtonDirective {

  // Reference to the associated form
  @Input('appDisableButton') form: NgForm;

  constructor(private el: ElementRef) {}

  // Listen to input events on form fields
  @HostListener('input') onInput(): void {
    this.updateButtonState();
  }

  private updateButtonState(): void {
    // Disable the button if any form control is empty
    const isAnyFieldEmpty = Object.keys(this.form.controls)
      .some(controlName => this.form.controls[controlName].value === '');

    this.el.nativeElement.disabled = isAnyFieldEmpty;
  }
}
