import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbTargetLink } from '../../../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbVerticalLayoutDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

@Component({
  selector: 'bmb-item-informative-text',
  standalone: true,
  imports: [
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
  ],
  templateUrl: './bmb-item-informative-text.component.html',
  styleUrl: './bmb-item-informative-text.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemInformativeTextComponent {
  icon = input<string>('');
  itemTitle = input.required<string>();
  supportText = input.required<string>();
  supportTextLinkLabel = input<string>();
  supportTextLink = input<string>();
  supportTextTarget = input<IBmbTargetLink>('_blank');
}
