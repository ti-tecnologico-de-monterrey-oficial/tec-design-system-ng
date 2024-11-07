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
    if (this.formService.getFormControlByName(this.name()) === null) {
      this.formService.setFormControlByType(
        this.type(),
        this.name(),
        this.value(),
      );
    }

    const control: FormControl = this.formService.getFormControlByName(this.name());
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
    this.formService.getFormControlByName(this.name()).updateValueAndValidity();
  }

  @HostListener('input', ['$event.target'])
  onInput(event: any) {
    const control: FormControl = this.formService.getFormControlByName(this.name());
    control.setValue(event.value);
    if (this.type() === 'text-area') {
      this.formService.setTextLength(
        this.name(),
        control.value.toString().length,
      );
    }
  }
}
