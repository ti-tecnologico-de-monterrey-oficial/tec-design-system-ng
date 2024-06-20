import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-input-phone-number',
  templateUrl: './bmb-input-phone-number.component.html',
  styleUrls: ['./bmb-input-phone-number.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatIntlTelInputComponent,
    BmbIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() disabled: boolean = false;
  @Input() showError: boolean = false;
  @Input() errorMessage: string = '';
  @Input() isRequired: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }

    if (this.isRequired) {
      this.control.setValidators(Validators.required);
    } else {
      this.control.clearValidators();
    }
    this.control.updateValueAndValidity();

    this.control.valueChanges.subscribe(() => {
      this.updateErrorState();
      this.cdr.markForCheck();
    });
  }

  private updateErrorState(): void {
    this.showError =
      this.isRequired &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty);
  }

  get shouldShowError(): boolean {
    return this.showError;
  }
}
