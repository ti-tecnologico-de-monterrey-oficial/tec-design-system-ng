import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbTargetLink } from '../../_shared/types';
import { BmbCheckExternalLinkButtonComponent } from '../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { CommonModule } from '@angular/common';
import { getUUID } from '../../_shared/logic/utils';
import {
  IBmbIconPosition,
  IBmbTextLinkStyle,
} from '../../_shared/types/components/text-link';
import { getTextLinkPositionClass } from '../../_shared/logic/components/text-link';

export type { IBmbIconPosition, IBmbTextLinkStyle };

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
  textLink = input<string>();
  textLinkStyle = input<IBmbTextLinkStyle>('icon');
  target = input<IBmbTargetLink>('_blank');
  icon = input<string>('arrow_forward');
  iconPosition = input<IBmbIconPosition>('right');
  link = input.required<string>();
  disabled = input<boolean>(false);
  testId = input<string>(getUUID());

  get positionClass(): string {
    return getTextLinkPositionClass(this.textLinkStyle(), this.iconPosition());
  }
}
