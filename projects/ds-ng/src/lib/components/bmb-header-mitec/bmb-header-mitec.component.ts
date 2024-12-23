import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bmb-header-mitec',
  standalone: true,
  imports: [],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent {
  headerLabel = input<string>();

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';
  appleIcon: string = '../assets/images/social-icons/icon_Apple.svg'
  androidIcon: string = '../assets/images/social-icons/icon_Android.svg'
  twitterIcon: string = '../assets/images/social-icons/icon_Twitter.svg'
  facebookIcon: string = '../assets/images/social-icons/icon_Facebook.svg'
  instagramIcon: string = '../assets/images/social-icons/icon_Instagram.svg'
  youTubeIcon: string = '../assets/images/social-icons/icon_Youtube.svg'
  mitecLogoIntroWeb: string = '../assets/images/gif/mitecLogoIntroWeb.gif'
  mitecLogoIntroMob: string = '../assets/images/gif/mitecLogoIntroMob.gif'
}
