import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { CommonModule } from '@angular/common';

export type IBmbBoxIconAppearance =
  | 'red'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'none'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon'
  | 'buttons-primary-normal'
  | 'purple-primary'
  | 'general_contrasts-main-selection'
  | 'general_contrasts-main-selection-alternative';
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
  boxColor = input<IBmbBoxIconAppearance>();
  boxSize = input<IBmbBoxIconSize>('small');

  get colorName(): string {
    return `color-${this.boxColor() || 'transparent'}`;
  }
}
