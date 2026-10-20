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
import { IBmbContrast } from '../../_shared/types/colors';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';
import { BmbBoxIconComponent } from '../bmb-box-icon/bmb-box-icon.component';
import {
  IBmbTargetLink,
  IBmbInteractiveIconAppearance,
  IBmbInteractiveIconType,
} from '../../_shared/types';
import { BmbTooltipBaseComponent } from '../bmb-tooltip/bmb-tooltip-base/bmb-tooltip-base.component';
import { getInteractiveIconClasses } from '../../_shared/logic/components/interactive-icon';

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
  testId = input<string>('interactive-icon-button');
  appearanceContrast = input<IBmbContrast>('default');
  appearance = input<IBmbInteractiveIconAppearance | (string & {})>('red');
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
    return getInteractiveIconClasses(
      this.layout(),
      this.appearanceContrast(),
      this.horizontal(),
    );
  }

  handleClick(event: MouseEvent): void {
    this.buttonClick.emit(event);
  }
}
