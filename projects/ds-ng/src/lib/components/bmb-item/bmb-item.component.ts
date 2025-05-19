import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbTargetLink } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-item',
  standalone: true,
  imports: [BmbIconComponent, CommonModule],
  templateUrl: './bmb-item.component.html',
  styleUrl: './bmb-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemComponent {
  icon = input<string>('');
  iconSize = input<number>(20);
  label = input<string>('');
  value = input<string>('');
  valueLink = input<string>('');
  valueTarget? = input<IBmbTargetLink>('_blank');
  supportText = input<string>('');
  isButton = input<boolean>(false);

  action = output<void>();

  handleClick(): void {
    this.action.emit();
  }
}
