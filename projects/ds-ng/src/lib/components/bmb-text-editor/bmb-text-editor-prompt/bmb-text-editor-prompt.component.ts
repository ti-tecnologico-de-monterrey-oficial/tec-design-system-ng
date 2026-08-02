import { Component, input, output } from '@angular/core';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../bmb-card/bmb-card.component';
import { BmbFormValidatorComponent } from '../../bmb-form-validator/bmb-form-validator.component';
import { FormControl, FormGroup } from '@angular/forms';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { BmbInputComponent } from '../../bmb-input/bmb-input.component';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbRadialComponent } from '../../bmb-radial/bmb-radial.component';
import { CommonModule } from '@angular/common';
import {
  BMB_BASE_GENERAL_CONTRAST_LIST,
  BMB_SEMANTIC_COLOR_LIST,
} from '../../../types/foundations/colors/color-type';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';

export type IBmbTextEditorPromptType = 'link' | 'image' | 'colors';

@Component({
  selector: 'app-bmb-text-editor-prompt',
  standalone: true,
  imports: [
    CommonModule,
    BmbCardComponent,
    BmbFormValidatorComponent,
    BmbButtonDirective,
    BmbCardContentComponent,
    BmbInputComponent,
    TranslatePipe,
    BmbCheckboxComponent,
    BmbRadialComponent,
    BmbActionIconComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './bmb-text-editor-prompt.component.html',
  styleUrl: './bmb-text-editor-prompt.component.scss',
})
export class BmbTextEditorPromptComponent {
  type = input.required<IBmbTextEditorPromptType>();

  formValues = output<Record<string, unknown>>();
  cancelForm = output<void>();
  selectedColor = output<string>();

  formGroup: FormGroup = new FormGroup({});

  colorLists: string[] = [
    ...BMB_SEMANTIC_COLOR_LIST,
    ...BMB_BASE_GENERAL_CONTRAST_LIST,
  ];

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  handleFormGroupState(): void {
    if (this.formGroup.valid) {
      const values = this.formGroup.getRawValue();
      this.formValues.emit(values);
    }
  }

  handleChangeColor(colorName: string): void {
    this.selectedColor.emit(colorName);
  }
}
