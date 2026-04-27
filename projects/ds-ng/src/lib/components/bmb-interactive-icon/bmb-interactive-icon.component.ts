import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import {
  IBmbAlertColors,
  IBmbBaseColors,
  IBmbCreativeBaseColors,
  IBmbCreativeUseColors,
  IBmbmitecBaseColors,
  IBmbMitecInstitutionalColors,
  IBmbSemanticBaseColors,
  IBmbSemanticColors,
  IBmbTargetLink,
} from '../../types';
import { IBmbContrast } from '../../types/colors';
import { logDeprecatedInput } from '../../utils/logDeprecatedInput';
import { BmbBoxIconComponent } from '../bmb-box-icon/bmb-box-icon.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

export type IBmbInteractiveIconAppearance =
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
  | 'general_contrasts-main-selection-alternative'
  | 'white';

export type IBmbInteractiveIconType = 'regular' | 'button' | 'app_drawer';

@Component({
  selector: 'bmb-interactive-icon',
  styleUrl: './bmb-interactive-icon.component.scss',
  templateUrl: './bmb-interactive-icon.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbBoxIconComponent,
    BmbTooltipComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInteractiveIconComponent {
  appearanceContrast = input<IBmbContrast>('default');
  appearance = input<
    | IBmbInteractiveIconAppearance
    | IBmbBaseColors
    | IBmbmitecBaseColors
    | IBmbCreativeBaseColors
    | IBmbSemanticBaseColors
    | IBmbSemanticColors
    | IBmbMitecInstitutionalColors
    | IBmbCreativeUseColors
    | IBmbAlertColors
  >('red');
  description = input<string>('');
  icon = input<string>('face');
  dotNotification = input<number>();
  horizontal = input<boolean>(false);
  target = input<IBmbTargetLink>();
  link = input<string>();
  layout = input<IBmbInteractiveIconType>('regular');
  setButtonTemplate = input<boolean>(false);
  componentTitle = input<string>();

  title = input<string>(); // deprecated

  buttonClick = output<MouseEvent>();

  constructor() {
    effect(() => {
      const deprecatedTitle = this.title();
      const newTitle = this.componentTitle();
      logDeprecatedInput(
        { name: 'title', hasValue: !!deprecatedTitle },
        { name: 'componentTitle', hasValue: !!newTitle },
      );
    });
  }

  getClasses(): string[] {
    const principalClassName: string = 'bmb_interactive_icon';
    const classes: string[] = [
      principalClassName,
      `${principalClassName}-${this.layout()}`,
    ];

    if (this.appearanceContrast() === 'primary') {
      classes.push('bmb_interactive_icon-primary');
    }

    if (this.appearanceContrast() === 'alternative') {
      classes.push('bmb_interactive_icon-alternative');
    }

    if (this.horizontal()) classes.push(`${principalClassName}-horizontal`);

    return classes;
  }

  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
