import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
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
} from '../../_shared/types/foundations/colors/color-type';
import { IBmbInteractiveIconAppearance } from '../../_shared/types/components/interactive-icon';
import { IBmbColor } from '../../_shared/types';
import {
  IBmbBoxIconShape,
  IBmbBoxIconSize,
} from '../../_shared/types/components/box-icon';
import { getBoxIconClasses } from '../../_shared/logic/components/box-icon';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
  boxShape = input<IBmbBoxIconShape>('square');

  imageNotFoundError = output<void>();

  get colorName(): string {
    return this.boxColor() || 'transparent';
  }

  get classes(): string[] {
    return getBoxIconClasses(this.boxSize(), this.boxShape(), this.colorName);
  }

  handleImageNotFoundError(): void {
    this.imageNotFoundError.emit();
  }
}
