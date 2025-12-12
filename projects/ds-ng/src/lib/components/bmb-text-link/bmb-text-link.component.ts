import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbTargetLink } from '../../types';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';

export type IBmbIconPosition = 'left' | 'right';
export type IBmbTextLinkStyle = 'icon' | 'underlined';

@Component({
  selector: 'bmb-text-link',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-text-link.component.html',
  styleUrl: './bmb-text-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTextLinkComponent {
  textLink = input.required<string>();
  textLinkStyle = input<IBmbTextLinkStyle>('icon');
  target = input<IBmbTargetLink>('_blank');
  icon = input<string>('arrow_forward');
  iconPosition = input<IBmbIconPosition>('right');
  link = input.required<string>();
  disabled = input<boolean>(false);
  isOS = input<boolean>(false); //Internal

  get positionClass(): string {
    if (this.textLinkStyle() === 'icon')
      return 'bmb_text-link-item-position_'.concat(this.iconPosition());

    return '';
  }
}
