import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';
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

export type IBmbBoxIconSize = 'regular' | 'small';

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
  >();
  boxSize = input<IBmbBoxIconSize>('small');

  get colorName(): string {
    return `color-${this.boxColor() || 'transparent'}`;
  }
}
