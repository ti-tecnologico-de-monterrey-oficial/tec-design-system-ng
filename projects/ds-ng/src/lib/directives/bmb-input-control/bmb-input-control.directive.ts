import {
  ChangeDetectorRef,
  Directive,
  HostListener,
  input,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { IBbmInputType } from '../../../public-api';
import { BmbFormService } from '../bmb-form-control/bmb-form-control.service';

@Directive({
  selector: '[bmbControl]',
  standalone: true,
})
export class BmbInputControlDirective {
  type = input<IBbmInputType>('text-area');
  name = input.required<string>();
  value = input.required<unknown>();
  required = input.required<boolean>();

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: BmbFormService,
  ) {}

  ngOnInit(): void {
    if (this.formService.getFormControl(this.name()) === null) {
      this.formService.setFormControlByType(this.name(), this.type());
    }

    const control: FormControl = this.formService.getFormControl(this.name());
      this.name(),
      this.formService.getControl(
        this.type(),
        this.name(),
        this.value(),
        true,
        this.required()!,
        this.cdr,
        control,
    );
  }

  @HostListener('blur')
  onBlur() {
    this.formService.getFormControl(this.name()).updateValueAndValidity();
  }

  @HostListener('input', ['$event.target'])
  onInput(event: any) {
    const control: FormControl = this.formService.getFormControl(this.name());
    control.setValue(event.value);
    if (this.type() === 'text-area') {
      this.formService.setTextLength(
        this.name(),
        control.value.toString().length,
      );
    }
    // if (this.type() === 'phone') {
    //   console.log(control.errors?.validatePhoneNumber);
    //   debugger;
    // }
  }
}
