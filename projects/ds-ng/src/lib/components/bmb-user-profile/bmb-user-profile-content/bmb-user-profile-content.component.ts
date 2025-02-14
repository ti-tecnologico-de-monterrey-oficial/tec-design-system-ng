import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbTextLinkComponent } from '../../bmb-text-link/bmb-text-link.component';
import { BmbUserSummaryComponent } from '../../bmb-user-summary/bmb-user-summary.component';
import { IBmbTargetLink, IBmbUserInfo } from '../../../types';

@Component({
  selector: 'bmb-user-profile-content',
  standalone: true,
  imports: [BmbUserSummaryComponent, BmbTextLinkComponent],
  templateUrl: './bmb-user-profile-content.component.html',
  styleUrl: './bmb-user-profile-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUserProfileContentComponent {
  anotherAccountLabel = input<string>('Ingresar con otra cuenta');
  anotherAccountLink = input<string>('');
  anotherAccountTarget = input<IBmbTargetLink>('_blank');
  userInfo = input.required<IBmbUserInfo>();
}
