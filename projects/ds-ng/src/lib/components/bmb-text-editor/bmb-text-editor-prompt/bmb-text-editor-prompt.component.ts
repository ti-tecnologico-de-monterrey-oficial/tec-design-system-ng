import { Component, input, output } from '@angular/core';
import { BmbCardComponent, BmbCardContentComponent } from '../../bmb-card/bmb-card.component';
import { BmbFormValidatorComponent } from '../../bmb-form-validator/bmb-form-validator.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbInputComponent } from '../../bmb-input/bmb-input.component';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbLayoutDirective } from "../../../directives/bmb-layout/bmb-layout.directive";
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbRadialComponent } from '../../bmb-radial/bmb-radial.component';

export type IBmbTextEditorPromptType = 'link' | 'image';

@Component({
  selector: 'app-bmb-text-editor-prompt',
  standalone: true,
  imports: [
    BmbCardComponent,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbCardContentComponent,
    BmbInputComponent,
    TranslatePipe,
    BmbCheckboxComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbRadialComponent,
],
  templateUrl: './bmb-text-editor-prompt.component.html',
  styleUrl: './bmb-text-editor-prompt.component.scss'
})
export class BmbTextEditorPromptComponent {
  type = input.required<IBmbTextEditorPromptType>();

  formGroup:FormGroup = new FormGroup({});

  formValues = output<Record<string, unknown>>();
  cancelForm = output<void>();

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  handleFormGroupState(): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();

      console.log(values);


      this.formValues.emit(values);
    }
  }
}
