import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-input',
  styleUrls: ['./bmb-input.component.scss'],
  templateUrl: './bmb-input.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() errorMessage: string = '';
  @Input() helperMessage: string = '';
  @Input() appearance: string = 'normal';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showError: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() name: string = '';

  @Output() isFocus: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }

    if (this.isRequired) {
      this.control.addValidators(Validators.required);
    }

    // else {
    //   this.control.clearValidators();
    // }

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

  onFocus() {
    this.isFocus.emit(true);
  }

  onBlur() {
    this.isFocus.emit(false);
  }

  get inputClasses(): { [key: string]: boolean } {
    return {
      ['bmb_field-input-' + this.appearance]: true,
      'bmb_field-input-error': this.shouldShowError,
      disabled: this.disabled,
    };
  }

  get shouldShowError(): boolean {
    return this.showError;
  }
}
