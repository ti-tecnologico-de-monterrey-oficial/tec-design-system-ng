import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { isExternalLink } from '../../utils/utils';

export type IBmbTargetLink = '_blank' | '_parent' | '_self' | '_top';
export type IBmbIconPosition = 'left' | 'right';
export type IBmbTextLinkStyle = 'icon' | 'underlined';

@Component({
  selector: 'bmb-text-link',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, RouterModule],
  templateUrl: './bmb-text-link.component.html',
  styleUrl: './bmb-text-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTextLinkComponent {
  textLink = input<string>('');
  textLinkStyle = input<IBmbTextLinkStyle>('icon');
  target = input<IBmbTargetLink>('_blank');
  icon = input<string>('arrow_forward');
  iconPosition = input<IBmbIconPosition>('right');
  link = input<string>('');
  disabled = input<boolean>(false);

  isExternalLink(link: string): boolean {
    if (link) {
      return isExternalLink(link);
    }
    return false;
  }

  getClass() {
    if (this.textLinkStyle() == 'underlined') {
      return 'bmb_text-link-underlined';
    }
    return 'bmb_text-link';
  }
}
