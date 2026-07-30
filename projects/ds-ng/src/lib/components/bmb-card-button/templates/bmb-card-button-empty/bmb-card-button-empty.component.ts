import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { IDropdownItem } from '../../../../types';
import { BmbBoxIconComponent } from '../../../bmb-box-icon/bmb-box-icon.component';
import { BmbCardButtonComponent } from '../../bmb-card-button.component';

@Component({
  selector: 'bmm-card-button-empty',
  standalone: true,
  imports: [BmbButtonDirective, BmbCardButtonComponent, BmbBoxIconComponent],
  templateUrl: './bmb-card-button-empty.component.html',
  styleUrl: './bmb-card-button-empty.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbCardButtonEmpty {
  componentTitle = input<string>('');
  summaryText = input<string>('');
  currentCount = input<number>(0);
  totalCount = input<string>('00');
  emptyIcon = input<string>('thumb_up');
  emptyTitle = input<string>('');
  emptyDescription = input<string>('');
  buttonText = input<string>('');

  isDisabled = input<boolean>(false);
  hasMenu = input<boolean>(false);
  menuItems = input<IDropdownItem[]>([]);

  buttonClick = output<MouseEvent>();
}
