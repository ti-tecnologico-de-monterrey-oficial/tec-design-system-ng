import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbActionHeader } from '../../types';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';

@Component({
  selector: 'bmb-header-mitec',
  standalone: true,
  imports: [BmbNavigationBarComponent],
  templateUrl: './bmb-header-mitec.component.html',
  styleUrl: './bmb-header-mitec.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderMitecComponent {
  headerLabel = input<string>();
  actionHeaders = input<IBmbActionHeader[]>([]);

  tecLogoImage: string = '../assets/images/tec-logo.svg';
  mitecImage: string = '../assets/images/logos-mitec/logo_mitec-vertical.svg';
  mitecLogoIntroWeb: string = '../assets/images/gif/mitecLogoIntroWeb.gif';
  mitecLogoIntroMob: string = '../assets/images/gif/mitecLogoIntroMob.gif';
}
