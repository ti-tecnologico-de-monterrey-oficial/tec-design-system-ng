import { Directive, ElementRef, HostListener, output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BmbFormService } from './bmb-form-control.service';

@Directive({
  selector: '[bmbForm]',
  standalone: true,
})
export class BmbFormControlDirective {
  formGroupState = output<FormGroup>();

  constructor(
    private formService: BmbFormService,
    private el: ElementRef,
  ) {}

  ngOnInit(): void {
    const inputs = this.el.nativeElement.querySelectorAll('bmb-input');
    inputs.forEach((input: any) => {
      const type = input.getAttribute('type');
      this.formService.setFormControlByType(
        type,
        this.getInputAttribute(input, 'name'),
        this.getInputAttribute(input, 'value'),
      );
    });
  }

  @HostListener('ngSubmit')
  submit() {
    const formGroup = this.formService.getFormGroup();
    if (formGroup.valid) {
      this.formGroupState.emit(formGroup);
      return;
    }
    this.updateErrorState(formGroup);
  }

  updateErrorState(formGroup: FormGroup) {
    const invalidInputs = this.el.nativeElement.querySelectorAll('.ng-invalid');
    invalidInputs.forEach((input: any) => {
      const control = formGroup.get(this.getInputAttribute(input, 'name'));
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
