import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { IDropdownItem } from '../../../../types';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';

@Component({
  selector: 'bmb-card-button-actions',
  standalone: true,
  imports: [BmbButtonDirective, BmbCardButtonComponent],
  templateUrl: './bmb-card-button-actions.component.html',
  styleUrl: './bmb-card-button-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonAction {
  componentTitle = input<string>('');
  body = input<string>('');
  leftContentIcon = input<string>('');
  trailingIcon = input<string>('');
  leftContent = input<boolean>(true);
  isFullInteractive = input<boolean>(true);
  isDisabled = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);
  buttonText = input<string>('Button');

  cardClick = output<MouseEvent | KeyboardEvent>();
  titleClick = output<MouseEvent | KeyboardEvent>();
  buttonClick = output<MouseEvent>();
}
