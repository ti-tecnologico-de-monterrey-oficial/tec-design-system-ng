import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader, IBmbLinkInfo } from '../../types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbMitecLogoAnimationComponent } from '../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';
import { TranslatePipe } from '../../pipes/translations';

export interface IBmbActionHeaderLinks {
  apple: IBmbLinkInfo;
  android: IBmbLinkInfo;
  twitter: IBmbLinkInfo;
  facebook: IBmbLinkInfo;
  instagram: IBmbLinkInfo;
  youtube: IBmbLinkInfo;
}

@Component({
  selector: 'bmb-header-mitec',
  standalone: true,
  imports: [
    BmbMitecLogoAnimationComponent,
    BmbNavigationBarComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent {
  headerLabel = input<string>();
  actionHeaderLinks = input<IBmbActionHeaderLinks>();

  _actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'bmb_apple',
      alt: 'apple social icon',
      link: this.actionHeaderLinks()?.apple.link,
      action: () => {},
    },
    {
      icon: 'bmb_android',
      alt: 'android social icon',
      link: this.actionHeaderLinks()?.android.link,
      action: () => {},
    },
    {
      icon: 'bmb_twitter',
      alt: 'twitter social icon',
      link: this.actionHeaderLinks()?.twitter.link,
      action: () => {},
    },
    {
      icon: 'bmb_facebook',
      alt: 'facebook social icon',
      link: this.actionHeaderLinks()?.facebook.link,
      action: () => {},
    },
    {
      icon: 'bmb_instagram',
      alt: 'instagram social icon',
      link: this.actionHeaderLinks()?.instagram.link,
      action: () => {},
    },
    {
      icon: 'bmb_youtube',
      alt: 'youtube social icon',
      link: this.actionHeaderLinks()?.youtube.link,
      action: () => {},
    },
  ];
}
