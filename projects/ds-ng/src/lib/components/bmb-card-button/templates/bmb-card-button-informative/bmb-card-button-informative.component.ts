import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import {
  IBmbBadgeInfo,
  IBmbImageInfo,
  IBmbLinkConfiguration,
  IDropdownItem,
} from '../../../../types';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';
import { BmbTooltipComponent } from '../../../bmb-tooltip/bmb-tooltip.component';

@Component({
  selector: 'bmb-card-button-informative',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbCardButtonComponent,
    BmbTooltipComponent,
  ],
  templateUrl: './bmb-card-button-informative.component.html',
  styleUrl: './bmb-card-button-informative.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonInformativeComponent {
  componentTitle = input<string>('');
  body = input<string>('');
  badge = input<IBmbBadgeInfo>();
  icon = input<string>('');
  leftContentIcon = input<string>('');
  leftContentImage = input<IBmbImageInfo>();
  leftContent = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);
  isDisabled = input<boolean>(false);
  textLink = input<IBmbLinkConfiguration>();
  tooltipTitle = input<string>('');
  tooltipText = input<string>('');
  tooltipIcon = input<string>('info');
  tooltipSize = input<number>(20);
  tooltipMobileOnly = input<boolean>(false);

  complementaryText = input<string>('');
  primaryButtonText = input<string>('');
  secondaryButtonText = input<string>('');

  cardClick = output<MouseEvent | KeyboardEvent>();
  titleClick = output<MouseEvent | KeyboardEvent>();
  primaryButtonClick = output<MouseEvent>();
  secondaryButtonClick = output<MouseEvent>();
}
