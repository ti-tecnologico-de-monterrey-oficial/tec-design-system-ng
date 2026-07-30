import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IBbmBgAppearance } from '../../../bmb-advertisement-card/types';
import { BmbBadgeComponent } from '../../../bmb-badge/bmb-badge.component';
import { BmbButtonIconComponent } from '../../../bmb-button-icon/bmb-button-icon.component';
import { BmbBoxIconComponent } from '../../../bmb-box-icon/bmb-box-icon.component';
import { BmbListGroupComponent } from '../../../bmb-list-group/bmb-list-group.component';
import { BmbListGroupItemComponent } from '../../../bmb-list-group/bmb-list-group-item/bmb-list-group-item.component';
import { IDropdownItem } from '../../../../types';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';

export interface ICardButtonHomeItem {
  id: string;
  title: string;
  subtitle?: string;
  badgeText?: string;
  badgeAppearance?: IBbmBgAppearance;
  leadingIcon?: string;
  actionIcon?: string;
}

@Component({
  selector: 'bmb-card-button-home',
  standalone: true,
  imports: [
    BmbBadgeComponent,
    BmbButtonIconComponent,
    BmbCardButtonComponent,
    BmbBoxIconComponent,
    BmbListGroupComponent,
    BmbListGroupItemComponent,
  ],
  templateUrl: './bmb-card-button-home.component.html',
  styleUrl: './bmb-card-button-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonHome {
  componentTitle = input<string>('');
  summaryText = input<string>('');
  currentCount = input<number>(0);
  totalCount = input<string>('00');
  items = input<ICardButtonHomeItem[]>([]);

  showBadge = input<boolean>(true);
  defaultBadgeText = input<string>('');
  defaultBadgeAppearance = input<IBbmBgAppearance>('mitec_blue');
  defaultLeadingIcon = input<string>('');
  defaultActionIcon = input<string>('');

  isFullInteractive = input<boolean>(true);
  isDisabled = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);

  selectionChange = output<string[]>();
  actionClick = output<{ event: MouseEvent; item: ICardButtonHomeItem }>();
}
