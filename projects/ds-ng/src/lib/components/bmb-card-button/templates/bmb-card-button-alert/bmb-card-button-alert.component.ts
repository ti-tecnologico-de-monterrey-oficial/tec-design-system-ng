import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IDropdownItem } from '../../../../types';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';

export type CardButtonAlertAppearance =
  | 'warning'
  | 'error'
  | 'success'
  | 'info';

@Component({
  selector: 'bmb-card-button-alert',
  standalone: true,
  imports: [BmbCardButtonComponent],
  templateUrl: './bmb-card-button-alert.component.html',
  styleUrl: './bmb-card-button-alert.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonAlert {
  componentTitle = input<string>('');
  body = input<string>('');
  appearance = input<CardButtonAlertAppearance>('info');
  leftContentIcon = input<string>('');
  trailingIcon = input<string>('');
  leftContent = input<boolean>(true);
  isFullInteractive = input<boolean>(true);
  isDisabled = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);

  cardClick = output<MouseEvent | KeyboardEvent>();
  titleClick = output<MouseEvent | KeyboardEvent>();
}
