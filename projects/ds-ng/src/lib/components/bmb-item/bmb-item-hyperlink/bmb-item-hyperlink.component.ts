import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbTargetLink } from '../../../types';
import { BmbItemComponent } from '../bmb-item.component';

@Component({
  selector: 'bmb-item-hyperlink',
  standalone: true,
  imports: [BmbItemComponent],
  templateUrl: './bmb-item-hyperlink.component.html',
  styleUrl: './bmb-item-hyperlink.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemHyperlinkComponent {
  icon = input<string>('');
  label = input.required<string>();
  value = input.required<string>();
  valueLink = input.required<string>();
  valueTarget = input<IBmbTargetLink>('_blank');
}
