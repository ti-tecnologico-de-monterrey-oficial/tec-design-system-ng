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
      this.formService.setFormControlByType(this.getInputName(input), type);
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
      const control = formGroup.get(this.getInputName(input));
      if (control) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getInputName(input: any): string {
    return (
      input.getAttribute('name') ||
      input.getAttribute('ng-reflect-name') ||
      input.parentElement.getAttribute('ng-reflect-name') ||
      ''
    );
  }
}
