import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { IDropdownItem } from '../../../../types';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';

@Component({
  selector: 'bmb-card-button-flat',
  standalone: true,
  imports: [BmbCardButtonComponent],
  templateUrl: './bmb-card-button-flat.component.html',
  styleUrl: './bmb-card-button-flat.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonFlat {
  componentTitle = input<string>('');
  complementaryText = input<string>('');
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
