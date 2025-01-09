import { Directive, ElementRef, HostListener, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BmbFormService } from './bmb-form-control.service';

@Directive({
  selector: '[bmbForm]',
  standalone: true,
})
export class BmbFormControlDirective {
  formGroupState = output<FormGroup>();

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private formService: BmbFormService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    const inputs = this.el.nativeElement.querySelectorAll(
      'bmb-input-validation',
    );
    inputs.forEach((input: any) => {
      const type = input.getAttribute('type');
      const controlName = this.getInputAttribute(input, 'name');
      this.formService.setFormControlByType(type, controlName);
      const control = this.formService.getFormControlByName(controlName);
      if (control) {
        this.formGroup.addControl(controlName, control);
      }
    });
    this.formGroupState.emit(this.formGroup);
  }

  @HostListener('ngSubmit')
  submit() {
    this.updateErrorState();
    this.formGroupState.emit(this.formGroup);
  }

  updateErrorState() {
    const invalidInputs = this.el.nativeElement.querySelectorAll('.ng-invalid');
    invalidInputs.forEach((input: any) => {
      const controlName = this.getInputAttribute(input, 'name');
      const control = this.formService.getFormControlByName(controlName);

      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getInputAttribute(input: any, attributeName: string): string {
    return (
      input.getAttribute(attributeName) ||
      input.getAttribute(`ng-reflect-${attributeName}`) ||
      input.parentElement.getAttribute(`ng-reflect-${attributeName}`) ||
      ''
    );
  }
}
