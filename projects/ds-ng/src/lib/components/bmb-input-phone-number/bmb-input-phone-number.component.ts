import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { BmbFormService } from '../../directives/bmb-form-control/bmb-form-control.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-input-phone-number',
  // styleUrls: ['./bmb-input-phone-number.component.scss'],
  // templateUrl: './bmb-input-phone-number.component.html',
  template: `
    <bmb-input
      type="phone"
      [name]="name()"
      [label]="label()"
      [value]="value()"
      [disabled]="disabled()"
      [isRequired]="isRequired()"
      [helperMessage]="helperMessage()"
      [errorMessage]="errorMessage()"
      [control]="control()"
      (onChange)="handleChange($event)"
    />
  `,
  standalone: true,
  imports: [BmbInputComponent],
  // imports: [
  //   CommonModule,
  //   ReactiveFormsModule,
  //   BmbInputComponent
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent {
  name = input.required<string>();
  label = input<string>('');
  value = input<string>();
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  helperMessage = input<string>('');
  errorMessage = input<string>('');
  control = input<FormControl>();

  change = output<HTMLInputElement>();

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: BmbFormService,
  ) {}

  getControl(): FormControl {
    return this.formService.getControl(
      'phone',
      this.name(),
      this.value(),
      true,
      this.isRequired(),
      this.cdr,
      this.control()!,
    );
  }

  get shouldShowError(): boolean {
    return this.formService.showError(this.name());
  }

  handleChange(event: any) {
    this.change.emit(event);
  }

  // handlePhoneChange(event: Event) {
  //   //ng-reflect-model
  //   if(event !== undefined && event !== null) {
  //     const name: string = this.name();
  //     const value: string = event.toString();
  //     this.change.emit({name, value} as HTMLInputElement);
  //   }
  // }
}
