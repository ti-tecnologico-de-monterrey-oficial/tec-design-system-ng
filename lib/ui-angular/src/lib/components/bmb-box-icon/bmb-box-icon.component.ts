import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

import {
  IBmbAlertColors,
  IBmbBaseColors,
  IBmbCreativeBaseColors,
  IBmbCreativeUseColors,
  IBmbmitecBaseColors,
  IBmbMitecInstitutionalColors,
  IBmbSemanticBaseColors,
  IBmbSemanticColors,
} from '../../types/foundations/colors/color-type';

import { IBmbInteractiveIconAppearance } from '../bmb-interactive-icon/bmb-interactive-icon.component';
import { IBmbColor } from '../../types';

import { getColorName } from '../../logic/components/box-icon/box-icon';
import { IBmbBoxIconSize } from '../../logic/components/box-icon/types';

@Component({
  selector: 'bmb-box-icon',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-box-icon.component.html',
  styleUrl: './bmb-box-icon.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbBoxIconComponent {
  iconName = input.required<string>();
  iconImageAlt = input<string>();
  isIconFilled = input<boolean>(true);

  boxColor = input<
    | IBmbBaseColors
    | IBmbmitecBaseColors
    | IBmbCreativeBaseColors
    | IBmbSemanticBaseColors
    | IBmbSemanticColors
    | IBmbMitecInstitutionalColors
    | IBmbCreativeUseColors
    | IBmbAlertColors
    | IBmbInteractiveIconAppearance
    | IBmbColor
  >();

  boxSize = input<IBmbBoxIconSize>('small');

  colorName = computed(() => getColorName(this.boxColor()));
}