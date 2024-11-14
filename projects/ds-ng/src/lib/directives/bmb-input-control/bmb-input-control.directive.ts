import { Directive, HostListener, input, output } from '@angular/core';
import { IBbmInputType } from '../../../public-api';
import { BmbFormService } from '../bmb-form-control/bmb-form-control.service';

@Directive({
  selector: '[bmbControl]',
  standalone: true,
})
export class BmbInputControlDirective {
  type = input<IBbmInputType>('text-area');
  name = input.required<string>();
  value = input<string>();
  checked = input<boolean>(false);
  onCheckedChange = output<any>();

  constructor(private formService: BmbFormService) {}

  handleCheck(target: any, event: any): void {
    target.name = this.name();
    target.checked = !this.checked();
    if (this.type() === 'checkbox') {
      target.value = target.checked;
      this.formService
        .getFormControlByName(this.name())
        .setValue(target.checked);
    }

    if (this.type() === 'radio' && target.checked) {
      this.formService.getFormControlByName(this.name()).setValue(this.value());
    }

    this.onCheckedChange.emit(event);
  }

  @HostListener('click', ['$event.target', '$event'])
  onClick(target: any, event: any) {
    this.handleCheck(target, event);
  }

  @HostListener('keypress', ['$event.target', '$event'])
  onKeyPress(target: any, event: any) {
    if (event.code.toLocaleUpperCase() === 'ENTER') {
      this.handleCheck(target, event);
    }
  }

  @HostListener('input', ['$event.target'])
  onInput() {
    if (this.type() === 'text-area') {
      this.formService.setTextLength(
        this.name(),
        this.formService.getFormControlByName(this.name()).value.toString()
          .length,
      );
    }
  }
}
