import { CommonModule } from '@angular/common';
import { FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  BmbFormValidatorComponent,
  BmbButtonDirective,
  BmbDropdownComponent,
  BmbInputComponent,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  IBmbDropdownItem,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-form-validator-test',
  imports: [
    CommonModule,
    BmbFormValidatorComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbDropdownComponent,
    BmbInputComponent,
  ],
  templateUrl: './form-validator-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class FormValidatorTestComponent {
  formGroup: FormGroup = new FormGroup({});

  options: IBmbDropdownItem[] = [];

  handleDropdownChange(event: unknown): void {
    if (event === '_banana') {
      this.formGroup.controls['text_field1'].enable();
      this.options = [
        { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
        { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
        { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
        { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
        { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
      ];
      this.formGroup.controls['dropdown2'].enable();
    }
  }

  handleSubmit(form: FormGroup): void {
    console.info('handleSubmit form state:', form);
  }
}
