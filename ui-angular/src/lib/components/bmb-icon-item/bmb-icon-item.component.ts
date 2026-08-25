import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbItemComponent } from '../old/bmb-item/bmb-item.component';
import { CommonModule } from '@angular/common';
import { getIconItemClasses } from '@shared/logic/components/icon-item';

@Component({
  selector: 'bmb-icon-item',
  standalone: true,
  imports: [CommonModule, BmbItemComponent],
  templateUrl: './bmb-icon-item.component.html',
  styleUrl: './bmb-icon-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbIconItemComponent {
  icon = input<string>('');
  iconSize = input<number>(24);
  label = input.required<string>();
  value = input.required<string>();
  showDivider = input<boolean>(true);

  getClasses(showDivider: boolean): ReturnType<typeof getIconItemClasses> {
    return getIconItemClasses(showDivider);
  }
}
