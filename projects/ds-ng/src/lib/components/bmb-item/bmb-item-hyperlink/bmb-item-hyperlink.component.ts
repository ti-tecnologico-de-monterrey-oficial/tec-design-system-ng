import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbTargetLink } from '../../../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';

@Component({
  selector: 'bmb-item-hyperlink',
  standalone: true,
  imports: [
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
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
