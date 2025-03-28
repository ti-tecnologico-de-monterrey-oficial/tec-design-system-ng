import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader, IBmbLinkInfo } from '../../types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbMitecLogoAnimationComponent } from '../bmb-mitec-logo-animation/bmb-mitec-logo-animation.component';

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
  imports: [BmbMitecLogoAnimationComponent, BmbNavigationBarComponent],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent {
  headerLabel = input<string>('ESTUDIANTES');
  actionHeaderLinks = input<IBmbActionHeaderLinks>();

  _actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'apple_svg',
      alt: 'apple social icon',
      link: this.actionHeaderLinks()?.apple.link,
      action: () => {},
    },
    {
      icon: 'android_svg',
      alt: 'android social icon',
      link: this.actionHeaderLinks()?.android.link,
      action: () => {},
    },
    {
      icon: 'twitter_svg',
      alt: 'witter social icon',
      link: this.actionHeaderLinks()?.twitter.link,
      action: () => {},
    },
    {
      icon: 'facebook_svg',
      alt: 'facebook social icon',
      link: this.actionHeaderLinks()?.facebook.link,
      action: () => {},
    },
    {
      icon: 'instagram_svg',
      alt: 'instagram social icon',
      link: this.actionHeaderLinks()?.instagram.link,
      action: () => {},
    },
    {
      icon: 'youtube_svg',
      alt: 'youtube social icon',
      link: this.actionHeaderLinks()?.youtube.link,
      action: () => {},
    },
  ];
}
