import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import {
  IBmbAlertColors,
  IBmbBaseColors,
  IBmbCreativeBaseColors,
  IBmbCreativeUseColors,
  IBmbmitecBaseColors,
  IBmbMitecInstitutionalColors,
  IBmbSemanticBaseColors,
  IBmbSemanticColors,
} from '../../../_shared/types/foundations/colors/color-type';
import { IBmbContrast } from '../../../_shared/types/colors';
import { logDeprecatedInput } from '../../../_shared/logic/logDeprecatedInput';
import { BmbBoxIconComponent } from '../bmb-box-icon/bmb-box-icon.component';
import { IBmbTargetLink, IBmbInteractiveIconAppearance } from '../../../_shared/types';
import { BmbTooltipBaseComponent } from '../bmb-tooltip/bmb-tooltip-base/bmb-tooltip-base.component';

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
    BmbTooltipBaseComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInteractiveIconComponent {
  appearanceContrast = input<IBmbContrast>('default');
  appearance = input<
    | IBmbBaseColors
    | IBmbmitecBaseColors
    | IBmbCreativeBaseColors
    | IBmbSemanticBaseColors
    | IBmbSemanticColors
    | IBmbMitecInstitutionalColors
    | IBmbCreativeUseColors
    | IBmbAlertColors
    | IBmbInteractiveIconAppearance
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
