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
import { IBmbContrast } from '../../types/colors';

export type IBmbIconPosition = 'left' | 'right';
export type IBmbTextLinkStyle = 'icon' | 'underlined';

@Component({
  selector: 'bmb-text-link',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-text-link.component.html',
  styleUrl: './bmb-text-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbTextLinkComponent {
  appearance = input<IBmbContrast>('default');
  textLink = input.required<string>();
  textLinkStyle = input<IBmbTextLinkStyle>('icon');
  target = input<IBmbTargetLink>('_blank');
  icon = input<string>('arrow_forward');
  iconPosition = input<IBmbIconPosition>('right');
  link = input.required<string>();
  disabled = input<boolean>(false);

  getClasses(linkStyle: string, isDisabled: boolean): string[] {
    const principalClassName: string = 'bmb_text-link';
    const classes: string[] = [principalClassName];

    if (linkStyle === 'underlined')
      classes.push(`${principalClassName}-underlined`);

    if (isDisabled) classes.push(`${principalClassName}-disabled`);

    return classes;
  }

  getPositionClass(
    principalClassName: string,
    isIcon: boolean,
    position: string,
  ): string[] {
    const classes: string[] = [principalClassName];

    if (isIcon) classes.push(`${principalClassName}-position_${position}`);

    return classes;
  }
}
